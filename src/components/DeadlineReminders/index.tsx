import { useActivities } from "@/contexts/ActivitiesContext";
import { useExams } from "@/contexts/ExamsContext";
import { scheduleDeadlineReminders } from "@/utils/deadlineReminders";
import * as Notifications from "expo-notifications";
import { Href, router } from "expo-router";
import { useEffect } from "react";
import { Platform } from "react-native";

// Sem isso, o lembrete que chega com o app aberto não aparece.
if (Platform.OS !== "web") {
    Notifications.setNotificationHandler({
        handleNotification: async () => ({
            shouldShowBanner: true,
            shouldShowList: true,
            shouldPlaySound: true,
            shouldSetBadge: false,
        }),
    });
}

// Não desenha nada: mantém os lembretes do celular em dia e abre a tela certa ao tocar num deles.
export function DeadlineReminders() {
    const { activities } = useActivities();
    const { exams } = useExams();
    const lastResponse = Notifications.useLastNotificationResponse();

    useEffect(() => {
        scheduleDeadlineReminders(activities, exams).catch((error) => {
            console.warn("Não foi possível agendar os lembretes de prazo.", error);
        });
    }, [activities, exams]);

    useEffect(() => {
        if (lastResponse?.actionIdentifier !== Notifications.DEFAULT_ACTION_IDENTIFIER) {
            return;
        }

        const url = lastResponse.notification.request.content.data?.url;

        if (typeof url === "string") {
            router.push(url as Href);
        }
    }, [lastResponse]);

    return null;
}
