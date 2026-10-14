import { ActivityDetail } from "@/data/activities";
import { Exam } from "@/data/exams";
import { isPending, URGENT_DAYS } from "@/utils/activityStatus";
import { daysUntil, parseIsoDate } from "@/utils/date";
import { Href } from "expo-router";

export type DeadlineAlert = {
    key: string;
    kind: "activity" | "exam";
    title: string;
    discipline: string;
    message: string;
    // Negativo quando já passou do prazo.
    days: number;
    href: Href;
};

function describeDays(days: number, today: string) {
    if (days === 0) {
        return today;
    }
    if (days === 1) {
        return "amanhã";
    }
    return `em ${days} dias`;
}

function activityMessage(days: number) {
    if (days < 0) {
        return days === -1 ? "Atrasada desde ontem" : `Atrasada há ${-days} dias`;
    }
    return `Entrega ${describeDays(days, "hoje")}`;
}

// Avisos mostrados no sino: atividades pendentes atrasadas ou com entrega até depois de amanhã,
// e provas desse mesmo período. As mais atrasadas aparecem primeiro.
export function getDeadlineAlerts(activities: ActivityDetail[], exams: Exam[], today = new Date()): DeadlineAlert[] {
    const activityAlerts = activities
        .filter(isPending)
        .map((activity) => ({ activity, days: daysUntil(parseIsoDate(activity.dueDate), today) }))
        .filter(({ days }) => days <= URGENT_DAYS)
        .map(({ activity, days }): DeadlineAlert => ({
            key: `activity-${activity.id}`,
            kind: "activity",
            title: activity.title,
            discipline: activity.discipline,
            message: activityMessage(days),
            days,
            href: { pathname: "/activity/[id]", params: { id: activity.id } },
        }));

    const examAlerts = exams
        .map((exam) => ({ exam, days: daysUntil(parseIsoDate(exam.date), today) }))
        .filter(({ days }) => days >= 0 && days <= URGENT_DAYS)
        .map(({ exam, days }): DeadlineAlert => ({
            key: `exam-${exam.id}`,
            kind: "exam",
            title: exam.title,
            discipline: exam.discipline,
            message: `Prova ${describeDays(days, "hoje")}`,
            days,
            href: { pathname: "/exam/edit/[id]", params: { id: exam.id } },
        }));

    return [...activityAlerts, ...examAlerts].sort((a, b) => a.days - b.days);
}
