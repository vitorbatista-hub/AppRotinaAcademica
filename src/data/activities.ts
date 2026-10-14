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

export type ActivityStatus = "urgent" | "upcoming" | "inProgress" | "done";

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
