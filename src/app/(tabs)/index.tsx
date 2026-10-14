import { DisciplineInfoCard } from "@/components/DisciplineInfoCard";
import { Header } from "@/components/Header";
import { SummaryCard } from "@/components/SummaryCard";
import { UpcomingActivityCard } from "@/components/UpcomingActivityCard";
import { useActivities } from "@/contexts/ActivitiesContext";
import { useDisciplines } from "@/contexts/DisciplinesContext";
import { Activity, ActivityDetail } from "@/data/activities";
import { summary } from "@/data/summary";
import { styles } from "@/screens/Home/styles";
import { colors } from "@/styles/colors";
import { isPending } from "@/utils/activityStatus";
import { daysUntil, parseIsoDate } from "@/utils/date";
import { FontAwesome6, MaterialCommunityIcons } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SUMMARY_ICON_SIZE = 20;
const HOME_ACTIVITIES_LIMIT = 2;
const HOME_DISCIPLINES_LIMIT = 2;

function getBadge(activity: ActivityDetail, days: number) {
    if (activity.status === "late") {
        return "Atrasada";
    }
    if (activity.status === "inProgress") {
        return "Em andamento";
    }
    return days === 0 ? "Para hoje" : `Em ${days} ${days === 1 ? "dia" : "dias"}`;
}

// Converte a atividade do banco para o formato resumido do card da Home.
function toUpcomingActivity(activity: ActivityDetail): Activity {
    const days = daysUntil(parseIsoDate(activity.dueDate));
    const isWarning = activity.status === "urgent" || activity.status === "late";

    return {
        id: activity.id,
        title: activity.title,
        discipline: activity.discipline,
        badge: getBadge(activity, days),
        dueLabel: activity.dueLabel,
        tone: isWarning ? "warning" : "neutral",
    };
}

export default function Index() {
    const { activities, weekCount } = useActivities();
    const { disciplines } = useDisciplines();

    // A lista já vem do banco ordenada pela data de entrega.
    const upcomingActivities = activities
        .filter(isPending)
        .slice(0, HOME_ACTIVITIES_LIMIT)
        .map(toUpcomingActivity);

    return (
        <SafeAreaView style={styles.container} edges={["top"]}>
            <Header hasNotifications={summary.hasNotifications} />

            <ScrollView contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.titleContent}>
                    <Text style={styles.title}>Olá, estudante!</Text>
                    <Text style={styles.subtitle}>Organize sua rotina acadêmica</Text>
                </View>

                <View style={styles.summary}>
                    <SummaryCard total={weekCount}
                        title="Pendências"
                        subtitle="Para esta semana"
                        textColor={colors.orange}
                        accentColor={colors.background.red}
                        icon={
                            <MaterialCommunityIcons name="clipboard-alert"
                                color={colors.orange}
                                size={SUMMARY_ICON_SIZE} />
                        }
                        onPress={() => router.navigate({ pathname: "/activity", params: { filter: "week" } })}
                    />

                    <View style={styles.cardContent}>
                        <View style={styles.card}>
                            <SummaryCard total={summary.exams}
                                title="Provas"
                                subtitle="Próximos 15 dias"
                                textColor={colors.red}
                                accentColor={colors.background.error}
                                icon={
                                    <FontAwesome6 name="clipboard-question"
                                        color={colors.red}
                                        size={SUMMARY_ICON_SIZE} />
                                }
                            />
                        </View>

                        <View style={styles.card}>
                            <SummaryCard total={disciplines.length}
                                title="Disciplinas"
                                subtitle="Ativas no semestre"
                                textColor={colors.primary}
                                accentColor={colors.info}
                                accentOpacity={0.1}
                                icon={
                                    <FontAwesome6 name="graduation-cap"
                                        color={colors.primary}
                                        size={SUMMARY_ICON_SIZE} />
                                }
                                onPress={() => router.navigate("/discipline")}
                            />
                        </View>
                    </View>
                </View>

                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Próximas atividades</Text>
                        <Link href="/activity" style={styles.sectionLink}>Ver todas</Link>
                    </View>

                    {upcomingActivities.map((activity) => (
                        <UpcomingActivityCard key={activity.id}
                            activity={activity}
                            onPress={() => router.push({
                                pathname: "/activity/[id]",
                                params: { id: activity.id },
                            })}
                        />
                    ))}
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Disciplinas do semestre</Text>

                    <View style={styles.disciplines}>
                        {disciplines.slice(0, HOME_DISCIPLINES_LIMIT).map((discipline) => (
                            <DisciplineInfoCard key={discipline.id} discipline={discipline} />
                        ))}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
