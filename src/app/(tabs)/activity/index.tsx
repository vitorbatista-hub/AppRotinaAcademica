import { ActivityCard } from "@/components/ActivityCard";
import { FilterChip } from "@/components/FilterChip";
import { Header } from "@/components/Header";
import { NewActivityCard } from "@/components/NewActivityCard";
import { useActivities } from "@/contexts/ActivitiesContext";
import { ActivityDetail } from "@/data/activities";
import { summary } from "@/data/summary";
import { styles } from "@/screens/Activity/styles";
import { isDueThisWeek, NOT_STARTED_STATUSES } from "@/utils/activityStatus";
import { router, useLocalSearchParams } from "expo-router";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Filter = {
    // Valor usado no link, ex.: /activity?filter=week (card "Pendências" da Home).
    key: string;
    label: string;
    matches: (activity: ActivityDetail) => boolean;
};

const FILTERS: Filter[] = [
    { key: "all", label: "Todas", matches: () => true },
    { key: "week", label: "Esta semana", matches: (activity) => isDueThisWeek(activity) },
    { key: "notStarted", label: "Não iniciadas", matches: (activity) => NOT_STARTED_STATUSES.includes(activity.status) },
    { key: "inProgress", label: "Em andamento", matches: (activity) => activity.status === "inProgress" },
    { key: "done", label: "Concluídas", matches: (activity) => activity.status === "done" },
];

export default function Activity() {
    const { activities } = useActivities();
    // O filtro fica no parâmetro da rota, assim a Home consegue abrir a aba já filtrada.
    const { filter: filterParam } = useLocalSearchParams<{ filter?: string }>();
    const filter = FILTERS.find((item) => item.key === filterParam) ?? FILTERS[0];

    const filteredActivities = activities.filter(filter.matches);

    return (
        <SafeAreaView style={styles.container} edges={["top"]}>
            <Header hasNotifications={summary.hasNotifications} />

            <ScrollView contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.titleContent}>
                    <Text style={styles.title}>Atividades e Prazos</Text>
                    <Text style={styles.subtitle}>
                        Acompanhe suas entregas e mantenha sua rotina em dia.
                    </Text>
                </View>

                <ScrollView horizontal
                    style={styles.filters}
                    contentContainerStyle={styles.filtersContent}
                    showsHorizontalScrollIndicator={false}
                >
                    {FILTERS.map((item) => (
                        <FilterChip key={item.key}
                            label={item.label}
                            selected={item === filter}
                            onPress={() => router.setParams({ filter: item.key })}
                        />
                    ))}
                </ScrollView>

                <View style={styles.activities}>
                    {filteredActivities.map((activity) => (
                        <ActivityCard key={activity.id}
                            activity={activity}
                            onDetailsPress={() => router.push({
                                pathname: "/activity/[id]",
                                params: { id: activity.id },
                            })}
                        />
                    ))}

                    {filteredActivities.length === 0 && (
                        <Text style={styles.empty}>Nenhuma atividade encontrada.</Text>
                    )}
                </View>

                <View style={styles.newActivity}>
                    <NewActivityCard onPress={() => router.push("/activity/new")} />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
