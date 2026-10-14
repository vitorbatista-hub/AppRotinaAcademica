import { useActivities } from "@/contexts/ActivitiesContext";
import { Discipline, DisciplineInput } from "@/data/disciplines";
import { useSQLiteContext } from "expo-sqlite";
import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react";

type DisciplineRow = Omit<Discipline, "id"> & { id: number };

type DisciplinesContextData = {
    disciplines: Discipline[];
    addDiscipline: (discipline: DisciplineInput) => Promise<void>;
    updateDiscipline: (id: string, discipline: DisciplineInput) => Promise<void>;
    deleteDiscipline: (id: string) => Promise<void>;
};

const DisciplinesContext = createContext<DisciplinesContextData | null>(null);

export function DisciplinesProvider({ children }: { children: ReactNode }) {
    const db = useSQLiteContext();
    const { activities, reloadActivities } = useActivities();
    const [disciplines, setDisciplines] = useState<Discipline[]>();

    const fetchDisciplines = useCallback(async (): Promise<Discipline[]> => {
        const rows = await db.getAllAsync<DisciplineRow>(`
            SELECT d.id, d.name, d.teacher, d.schedule, d.room, d.color, d.icon,
                   COUNT(a.id) AS pendingCount
            FROM disciplines d
            LEFT JOIN activities a ON a.discipline_id = d.id AND a.status != 'done'
            GROUP BY d.id
            ORDER BY d.id
        `);

        return rows.map((row) => ({ ...row, id: String(row.id) }));
    }, [db]);

    // O pendingCount conta tudo que não foi concluído (inclui em andamento) e sai das atividades, então a consulta é refeita sempre que elas mudam.
    useEffect(() => {
        fetchDisciplines().then(setDisciplines);
    }, [fetchDisciplines, activities]);

    async function addDiscipline(discipline: DisciplineInput) {
        await db.runAsync(
            `INSERT INTO disciplines (name, teacher, schedule, room, color, icon)
             VALUES (?, ?, ?, ?, ?, ?)`,
            discipline.name,
            discipline.teacher,
            discipline.schedule,
            discipline.room,
            discipline.color,
            discipline.icon
        );
        setDisciplines(await fetchDisciplines());
    }

    async function updateDiscipline(id: string, discipline: DisciplineInput) {
        await db.runAsync(
            `UPDATE disciplines
             SET name = ?, teacher = ?, schedule = ?, room = ?, color = ?, icon = ?
             WHERE id = ?`,
            discipline.name,
            discipline.teacher,
            discipline.schedule,
            discipline.room,
            discipline.color,
            discipline.icon,
            id
        );
        // As atividades mostram o nome e o ícone da disciplina; relê-las também atualiza esta lista (pelo useEffect).
        await reloadActivities();
    }

    // Apaga junto as atividades e provas da disciplina; a chave estrangeira não deixaria elas sem disciplina.
    async function deleteDiscipline(id: string) {
        await db.withTransactionAsync(async () => {
            await db.runAsync("DELETE FROM activities WHERE discipline_id = ?", id);
            await db.runAsync("DELETE FROM exams WHERE discipline_id = ?", id);
            await db.runAsync("DELETE FROM disciplines WHERE id = ?", id);
        });
        await reloadActivities();
    }

    if (!disciplines) {
        return null;
    }

    return (
        <DisciplinesContext.Provider value={{ disciplines, addDiscipline, updateDiscipline, deleteDiscipline }}>
            {children}
        </DisciplinesContext.Provider>
    );
}

export function useDisciplines() {
    const context = useContext(DisciplinesContext);

    if (!context) {
        throw new Error("useDisciplines precisa ser usado dentro de DisciplinesProvider.");
    }

    return context;
}
