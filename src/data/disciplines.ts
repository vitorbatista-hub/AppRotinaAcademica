import Ionicons from "@expo/vector-icons/Ionicons";

export type Discipline = {
    id: string;
    name: string;
    teacher: string;
    schedule: string;
    room: string;
    color: string;
    icon: keyof typeof Ionicons.glyphMap;
    pendingCount: number;
};
