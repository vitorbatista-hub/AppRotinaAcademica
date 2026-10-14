import { ActivityDetail } from "@/data/activities";
import { Exam } from "@/data/exams";
import { URGENT_DAYS } from "@/utils/activityStatus";
import { daysUntil, parseIsoDate } from "@/utils/date";

// Prova da mesma disciplina até esse número de dias depois da entrega vira dica de revisão.
const EXAM_LINK_DAYS = 7;

function pluralDays(days: number) {
    return days === 1 ? "1 dia" : `${days} dias`;
}

// Escolhe a dica pela situação da atividade; a primeira regra que bater vence, da mais urgente para a mais geral.
export function getStudyTip(activity: ActivityDetail, exams: Exam[], today = new Date()) {
    const days = daysUntil(parseIsoDate(activity.dueDate), today);
    const hasDescription = activity.description.trim().length > 0;

    if (activity.status === "late") {
        return "O prazo já passou. Fale com o professor sobre a entrega com atraso e reserve um horário ainda hoje para terminar.";
    }

    if (days === 0) {
        return activity.status === "inProgress"
            ? "A entrega é hoje. Revise o que já fez, confira o formato pedido e envie com folga antes do fim do dia."
            : "A entrega é hoje e a atividade ainda não começou. Foque no essencial primeiro e deixe os detalhes para o final.";
    }

    if (days <= URGENT_DAYS && activity.status !== "inProgress") {
        return `Faltam ${pluralDays(days)} e a atividade ainda não começou. Comece hoje, mesmo que seja só pela primeira parte.`;
    }

    const exam = exams
        .filter((item) => item.disciplineId === activity.disciplineId)
        .map((item) => ({ item, examDays: daysUntil(parseIsoDate(item.date), today) }))
        .filter(({ examDays }) => examDays >= 0 && examDays - days <= EXAM_LINK_DAYS)
        .sort((a, b) => a.examDays - b.examDays)[0];

    if (exam) {
        return `"${exam.item.title}" de ${activity.discipline} está chegando. Use esta atividade como revisão e anote as dúvidas para levar ao professor.`;
    }

    if (activity.status === "inProgress") {
        return days <= URGENT_DAYS
            ? "Você já começou, ótimo. Reserve um tempo agora para terminar e revisar antes do prazo."
            : "Bom ritmo! Divida o que falta em partes menores e defina um dia para cada uma até a entrega.";
    }

    if (activity.priority === "high") {
        return `Prioridade alta com ${pluralDays(days)} de prazo. Comece pela parte mais difícil enquanto ainda há tempo para tirar dúvidas.`;
    }

    if (!hasDescription) {
        return "Ainda não há descrição. Anote o enunciado e os critérios de avaliação para não esquecer nenhum detalhe.";
    }

    return `Você tem ${pluralDays(days)} até a entrega. Separe 25 minutos hoje para dar o primeiro passo e evitar a correria no final.`;
}
