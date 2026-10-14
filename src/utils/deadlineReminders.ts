import { ActivityDetail } from "@/data/activities";
import { Exam } from "@/data/exams";
import { isPending } from "@/utils/activityStatus";
import { parseIsoDate } from "@/utils/date";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

const CHANNEL_ID = "prazos";
// Lembrete na véspera, à noite, e outro no próprio dia, de manhã.
const DAY_BEFORE_HOUR = 18;
const SAME_DAY_HOUR = 8;
// O iOS guarda no máximo 64 notificações agendadas por app; ficam as mais próximas.
const MAX_REMINDERS = 60;

type Reminder = {
    date: Date;
    title: string;
    body: string;
    url: string;
};

function atHour(isoDate: string, hour: number, dayOffset = 0) {
    const date = parseIsoDate(isoDate);
    date.setDate(date.getDate() + dayOffset);
    date.setHours(hour);
    return date;
}

function buildReminders(activities: ActivityDetail[], exams: Exam[]): Reminder[] {
    const activityReminders = activities.filter(isPending).flatMap((activity) => {
        const url = `/activity/${activity.id}`;
        const body = `${activity.title} · ${activity.discipline}`;

        return [
            { date: atHour(activity.dueDate, DAY_BEFORE_HOUR, -1), title: "Entrega amanhã", body, url },
            { date: atHour(activity.dueDate, SAME_DAY_HOUR), title: "Entrega hoje", body, url },
        ];
    });

    const examReminders = exams.flatMap((exam) => {
        const url = `/exam/edit/${exam.id}`;
        const body = `${exam.title} · ${exam.discipline}`;

        return [
            { date: atHour(exam.date, DAY_BEFORE_HOUR, -1), title: "Prova amanhã", body, url },
            { date: atHour(exam.date, SAME_DAY_HOUR), title: "Prova hoje", body, url },
        ];
    });

    const now = Date.now();

    return [...activityReminders, ...examReminders]
        .filter((reminder) => reminder.date.getTime() > now)
        .sort((a, b) => a.date.getTime() - b.date.getTime())
        .slice(0, MAX_REMINDERS);
}

// No Android 13+ o pedido de permissão só aparece depois que existe um canal.
async function ensurePermission() {
    if (Platform.OS === "android") {
        await Notifications.setNotificationChannelAsync(CHANNEL_ID, {
            name: "Prazos de atividades e provas",
            importance: Notifications.AndroidImportance.HIGH,
        });
    }

    const current = await Notifications.getPermissionsAsync();

    if (current.granted || !current.canAskAgain) {
        return current.granted;
    }

    const requested = await Notifications.requestPermissionsAsync();
    return requested.granted;
}

async function rescheduleAll(activities: ActivityDetail[], exams: Exam[]) {
    if (Platform.OS === "web" || !(await ensurePermission())) {
        return;
    }

    await Notifications.cancelAllScheduledNotificationsAsync();

    for (const reminder of buildReminders(activities, exams)) {
        await Notifications.scheduleNotificationAsync({
            content: {
                title: reminder.title,
                body: reminder.body,
                data: { url: reminder.url },
            },
            trigger: {
                type: Notifications.SchedulableTriggerInputTypes.DATE,
                date: reminder.date,
                channelId: CHANNEL_ID,
            },
        });
    }
}

let queue = Promise.resolve();

// Apaga os lembretes antigos e agenda de novo a partir das atividades e provas atuais.
// Chamado sempre que alguma delas muda, então datas editadas ou itens excluídos não deixam lembrete solto.
// Uma chamada espera a anterior terminar, para duas reagendas seguidas não duplicarem lembretes.
export function scheduleDeadlineReminders(activities: ActivityDetail[], exams: Exam[]) {
    const run = queue.then(() => rescheduleAll(activities, exams));
    queue = run.catch(() => undefined);
    return run;
}
