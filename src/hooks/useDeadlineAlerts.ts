import { useActivities } from "@/contexts/ActivitiesContext";
import { useExams } from "@/contexts/ExamsContext";
import { getDeadlineAlerts } from "@/utils/deadlineAlerts";

export function useDeadlineAlerts() {
    const { activities } = useActivities();
    const { exams } = useExams();

    return getDeadlineAlerts(activities, exams);
}
