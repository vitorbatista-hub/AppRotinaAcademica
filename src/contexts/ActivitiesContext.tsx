import { ActivityDetail, ActivityPriority, ActivityStatus } from "@/data/activities";
import { formatDueLabel, parseIsoDate } from "@/utils/date";
import { useSQLiteContext } from "expo-sqlite";
import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react";

export type NewActivity = {
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
    status: ActivityStatus;
    priority: ActivityPriority;
};

type ActivitiesContextData = {
    activities: ActivityDetail[];
    pendingCount: number;
    completedCount: number;
    addActivity: (activity: NewActivity) => Promise<void>;
    completeActivity: (id: string) => Promise<void>;
};

// Mesmos status do filtro "Pendentes" da tela de atividades e do pendingCount das disciplinas.
const PENDING_STATUSES: ActivityStatus[] = ["urgent", "upcoming"];

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
            dueLabel: formatDueLabel(parseIsoDate(row.dueDate)),
        }));
    }, [db]);

    useEffect(() => {
        fetchActivities().then(setActivities);
    }, [fetchActivities]);

    async function addActivity(activity: NewActivity) {
        await db.runAsync(
            `INSERT INTO activities (title, description, discipline_id, due_date, status, priority)
             VALUES (?, ?, ?, ?, ?, ?)`,
            activity.title,
            activity.description,
            activity.disciplineId,
            activity.dueDate,
            activity.priority === "high" ? "urgent" : "upcoming",
            activity.priority
        );
        setActivities(await fetchActivities());
    }

    async function completeActivity(id: string) {
        await db.runAsync("UPDATE activities SET status = 'done' WHERE id = ?", id);
        setActivities(await fetchActivities());
    }

    // Segura as telas até a primeira leitura do banco, para não piscar a lista vazia.
    if (!activities) {
        return null;
    }

    const pendingCount = activities.filter((activity) => PENDING_STATUSES.includes(activity.status)).length;
    const completedCount = activities.filter((activity) => activity.status === "done").length;

    return (
        <ActivitiesContext.Provider value={{ activities, pendingCount, completedCount, addActivity, completeActivity }}>
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
