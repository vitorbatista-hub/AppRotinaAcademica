import { DisciplineIcon } from "@/data/disciplines";

export type Exam = {
    id: string;
    title: string;
    disciplineId: string;
    discipline: string;
    color: string;
    icon: DisciplineIcon;
    // Data da prova no formato AAAA-MM-DD.
    date: string;
    dateLabel: string;
    notes: string;
};

// Dados que o formulário de prova envia para o banco.
export type ExamInput = {
    title: string;
    disciplineId: string;
    date: string;
    notes: string;
};
