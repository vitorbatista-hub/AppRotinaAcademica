import { ActivityDetail, ActivityPriority, StoredActivityStatus } from "@/data/activities";
import { getActivityStatus, isDueThisWeek, isPending } from "@/utils/activityStatus";
import { formatDueLabel, parseIsoDate } from "@/utils/date";
import { useSQLiteContext } from "expo-sqlite";
import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react";

export type ActivityInput = {
    title: string;
    description: string;
    disciplineId: string;
    // Data de entrega no formato AAAA-MM-DD.
    dueDate: string;
    priority: ActivityPriority;
};

type ActivityRow = {
    id: number;
    title: string;
    description: string;
    discipline: string;
    icon: ActivityDetail["icon"];
    dueDate: string;
    status: StoredActivityStatus;
    priority: ActivityPriority;
};

type ActivitiesContextData = {
    activities: ActivityDetail[];
    pendingCount: number;
    weekCount: number;
    completedCount: number;
    addActivity: (activity: ActivityInput) => Promise<void>;
    updateActivity: (id: string, activity: ActivityInput) => Promise<void>;
    deleteActivity: (id: string) => Promise<void>;
    startActivity: (id: string) => Promise<void>;
    completeActivity: (id: string) => Promise<void>;
    reopenActivity: (id: string) => Promise<void>;
};

const ActivitiesContext = createContext<ActivitiesContextData | null>(null);

export function ActivitiesProvider({ children }: { children: ReactNode }) {
    const db = useSQLiteContext();
    const [activities, setActivities] = useState<ActivityDetail[]>();

    const fetchActivities = useCallback(async (): Promise<ActivityDetail[]> => {
        // As concluídas ficam no fim; as demais, da entrega mais próxima para a mais distante.
        const rows = await db.getAllAsync<ActivityRow>(`
            SELECT a.id, a.title, a.description, a.due_date AS dueDate, a.status, a.priority,
                   d.name AS discipline, d.icon
            FROM activities a
            JOIN disciplines d ON d.id = a.discipline_id
            ORDER BY a.status = 'done', a.due_date, a.id
        `);

        return rows.map((row) => ({
            ...row,
            id: String(row.id),
            status: getActivityStatus(row.status, row.dueDate),
            dueLabel: formatDueLabel(parseIsoDate(row.dueDate)),
        }));
    }, [db]);

    useEffect(() => {
        fetchActivities().then(setActivities);
    }, [fetchActivities]);

    async function addActivity(activity: ActivityInput) {
        await db.runAsync(
            `INSERT INTO activities (title, description, discipline_id, due_date, status, priority)
             VALUES (?, ?, ?, ?, 'upcoming', ?)`,
            activity.title,
            activity.description,
            activity.disciplineId,
            activity.dueDate,
            activity.priority
        );
        setActivities(await fetchActivities());
    }

    async function updateActivity(id: string, activity: ActivityInput) {
        // O status não muda na edição; urgente e atrasada são recalculadas pela data nova.
        await db.runAsync(
            `UPDATE activities
             SET title = ?, description = ?, discipline_id = ?, due_date = ?, priority = ?
             WHERE id = ?`,
            activity.title,
            activity.description,
            activity.disciplineId,
            activity.dueDate,
            activity.priority,
            id
        );
        setActivities(await fetchActivities());
    }

    async function deleteActivity(id: string) {
        await db.runAsync("DELETE FROM activities WHERE id = ?", id);
        setActivities(await fetchActivities());
    }

    async function setStatus(id: string, status: StoredActivityStatus) {
        await db.runAsync("UPDATE activities SET status = ? WHERE id = ?", status, id);
        setActivities(await fetchActivities());
    }

    const startActivity = (id: string) => setStatus(id, "inProgress");
    const completeActivity = (id: string) => setStatus(id, "done");
    // Volta para "não iniciada"; a data decide se ela aparece como próxima, urgente ou atrasada.
    const reopenActivity = (id: string) => setStatus(id, "upcoming");

    // Segura as telas até a primeira leitura do banco, para não piscar a lista vazia.
    if (!activities) {
        return null;
    }

    const pendingCount = activities.filter(isPending).length;
    const weekCount = activities.filter((activity) => isDueThisWeek(activity)).length;
    const completedCount = activities.filter((activity) => activity.status === "done").length;

    return (
        <ActivitiesContext.Provider value={{
            activities,
            pendingCount,
            weekCount,
            completedCount,
            addActivity,
            updateActivity,
            deleteActivity,
            startActivity,
            completeActivity,
            reopenActivity,
        }}>
            {children}
        </ActivitiesContext.Provider>
    );
}

export function useActivities() {
    const context = useContext(ActivitiesContext);

    if (!context) {
        throw new Error("useActivities precisa ser usado dentro de ActivitiesProvider.");
    }

    return context;
}
