import { useDisciplines } from "@/contexts/DisciplinesContext";
import { Exam, ExamInput } from "@/data/exams";
import { daysUntil, formatDueLabel, parseIsoDate } from "@/utils/date";
import { useSQLiteContext } from "expo-sqlite";
import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react";

// Janela do card "Provas" da Home.
export const UPCOMING_EXAMS_DAYS = 15;

type ExamRow = Omit<Exam, "id" | "disciplineId" | "dateLabel"> & {
    id: number;
    disciplineId: number;
};

type ExamsContextData = {
    exams: Exam[];
    upcomingCount: number;
    addExam: (exam: ExamInput) => Promise<void>;
    updateExam: (id: string, exam: ExamInput) => Promise<void>;
    deleteExam: (id: string) => Promise<void>;
};

const ExamsContext = createContext<ExamsContextData | null>(null);

// Prova de hoje em diante; as que já passaram ficam como realizadas.
export function isUpcomingExam(exam: Exam, today = new Date()) {
    return daysUntil(parseIsoDate(exam.date), today) >= 0;
}

export function ExamsProvider({ children }: { children: ReactNode }) {
    const db = useSQLiteContext();
    const { disciplines } = useDisciplines();
    const [exams, setExams] = useState<Exam[]>();

    const fetchExams = useCallback(async (): Promise<Exam[]> => {
        const rows = await db.getAllAsync<ExamRow>(`
            SELECT e.id, e.title, e.date, e.notes,
                   e.discipline_id AS disciplineId, d.name AS discipline, d.color, d.icon
            FROM exams e
            JOIN disciplines d ON d.id = e.discipline_id
            ORDER BY e.date, e.id
        `);

        return rows.map((row) => ({
            ...row,
            id: String(row.id),
            disciplineId: String(row.disciplineId),
            dateLabel: formatDueLabel(parseIsoDate(row.date)),
        }));
    }, [db]);

    // As provas mostram nome e cor da disciplina, então são relidas quando as disciplinas mudam.
    useEffect(() => {
        fetchExams().then(setExams);
    }, [fetchExams, disciplines]);

    async function addExam(exam: ExamInput) {
        await db.runAsync(
            "INSERT INTO exams (title, discipline_id, date, notes) VALUES (?, ?, ?, ?)",
            exam.title,
            exam.disciplineId,
            exam.date,
            exam.notes
        );
        setExams(await fetchExams());
    }

    async function updateExam(id: string, exam: ExamInput) {
        await db.runAsync(
            "UPDATE exams SET title = ?, discipline_id = ?, date = ?, notes = ? WHERE id = ?",
            exam.title,
            exam.disciplineId,
            exam.date,
            exam.notes,
            id
        );
        setExams(await fetchExams());
    }

    async function deleteExam(id: string) {
        await db.runAsync("DELETE FROM exams WHERE id = ?", id);
        setExams(await fetchExams());
    }

    if (!exams) {
        return null;
    }

    const upcomingCount = exams.filter((exam) =>
        isUpcomingExam(exam) && daysUntil(parseIsoDate(exam.date)) <= UPCOMING_EXAMS_DAYS
    ).length;

    return (
        <ExamsContext.Provider value={{ exams, upcomingCount, addExam, updateExam, deleteExam }}>
            {children}
        </ExamsContext.Provider>
    );
}

export function useExams() {
    const context = useContext(ExamsContext);

    if (!context) {
        throw new Error("useExams precisa ser usado dentro de ExamsProvider.");
    }

    return context;
}
