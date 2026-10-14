import Ionicons from "@expo/vector-icons/Ionicons";

export type ActivityTone = "warning" | "neutral";

export type Activity = {
    id: string;
    title: string;
    discipline: string;
    badge: string;
    dueLabel: string;
    tone: ActivityTone;
};

// Status mostrado na tela. Atrasada, urgente e próxima são calculadas pela data de entrega.
export type ActivityStatus = "late" | "urgent" | "upcoming" | "inProgress" | "done";

// Status gravado no banco. Toda atividade não iniciada fica como "upcoming"
// ("urgent" só aparece em registros antigos e é tratado igual).
export type StoredActivityStatus = "urgent" | "upcoming" | "inProgress" | "done";

export type ActivityPriority = "low" | "medium" | "high";

export type ActivityDetail = {
    id: string;
    title: string;
    description: string;
    discipline: string;
    icon: keyof typeof Ionicons.glyphMap;
    dueDate: string;
    dueLabel: string;
    status: ActivityStatus;
    priority: ActivityPriority;
};
