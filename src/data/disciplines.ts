import Ionicons from "@expo/vector-icons/Ionicons";

export type DisciplineIcon = keyof typeof Ionicons.glyphMap;

export type Discipline = {
    id: string;
    name: string;
    teacher: string;
    schedule: string;
    room: string;
    color: string;
    icon: DisciplineIcon;
    pendingCount: number;
};

// Dados que o formulário de disciplina envia para o banco.
export type DisciplineInput = Omit<Discipline, "id" | "pendingCount">;

// Cores que o usuário pode escolher para a borda do card da disciplina.
export const DISCIPLINE_COLORS = ["#004AC6", "#006E2F", "#BC4800", "#BA1A1A", "#6B4E00", "#7B2FBE"];

// Ícones oferecidos no cadastro, já incluindo os das disciplinas de exemplo.
export const DISCIPLINE_ICONS: DisciplineIcon[] = [
    "book",
    "code-slash",
    "server",
    "hardware-chip",
    "stats-chart",
    "calculator",
    "people",
    "flask",
    "globe",
    "brush",
    "language",
    "construct",
];
