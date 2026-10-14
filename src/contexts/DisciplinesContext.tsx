import { useActivities } from "@/contexts/ActivitiesContext";
import { Discipline } from "@/data/disciplines";
import { useSQLiteContext } from "expo-sqlite";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

type DisciplineRow = Omit<Discipline, "id"> & { id: number };

type DisciplinesContextData = {
    disciplines: Discipline[];
};

const DisciplinesContext = createContext<DisciplinesContextData | null>(null);

export function DisciplinesProvider({ children }: { children: ReactNode }) {
    const db = useSQLiteContext();
    const { activities } = useActivities();
    const [disciplines, setDisciplines] = useState<Discipline[]>();

    // O pendingCount sai das atividades, então a consulta é refeita sempre que elas mudam.
    useEffect(() => {
        db.getAllAsync<DisciplineRow>(`
            SELECT d.id, d.name, d.teacher, d.schedule, d.room, d.color, d.icon,
                   COUNT(a.id) AS pendingCount
            FROM disciplines d
            LEFT JOIN activities a ON a.discipline_id = d.id AND a.status IN ('urgent', 'upcoming')
            GROUP BY d.id
            ORDER BY d.id
        `).then((rows) => {
            setDisciplines(rows.map((row) => ({ ...row, id: String(row.id) })));
        });
    }, [db, activities]);

    if (!disciplines) {
        return null;
    }

    return (
        <DisciplinesContext.Provider value={{ disciplines }}>
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
