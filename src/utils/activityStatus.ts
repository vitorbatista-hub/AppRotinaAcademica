import { ActivityDetail, ActivityStatus, StoredActivityStatus } from "@/data/activities";
import { daysUntil, parseIsoDate } from "@/utils/date";

// Hoje, amanhã e depois de amanhã contam como urgente.
const URGENT_DAYS = 2;
const WEEK_DAYS = 7;

// Status que ainda precisam ser entregues (inclui as que já foram começadas).
export const PENDING_STATUSES: ActivityStatus[] = ["late", "urgent", "upcoming", "inProgress"];

// Status das atividades que ainda não foram iniciadas.
export const NOT_STARTED_STATUSES: ActivityStatus[] = ["late", "urgent", "upcoming"];

// Em andamento e concluída são escolhas do usuário; o resto depende só da data de entrega.
export function getActivityStatus(stored: StoredActivityStatus, dueDate: string, today = new Date()): ActivityStatus {
    if (stored === "inProgress" || stored === "done") {
        return stored;
    }

    const days = daysUntil(parseIsoDate(dueDate), today);

    if (days < 0) {
        return "late";
    }
    return days <= URGENT_DAYS ? "urgent" : "upcoming";
}

export function isPending(activity: ActivityDetail) {
    return PENDING_STATUSES.includes(activity.status);
}

// Pendente com entrega nos próximos 7 dias. As atrasadas entram, porque ainda precisam ser feitas.
export function isDueThisWeek(activity: ActivityDetail, today = new Date()) {
    return isPending(activity) && daysUntil(parseIsoDate(activity.dueDate), today) <= WEEK_DAYS;
}
