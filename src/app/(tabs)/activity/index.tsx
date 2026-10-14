import { ActivityCard } from "@/components/ActivityCard";
import { FilterChip } from "@/components/FilterChip";
import { Header } from "@/components/Header";
import { NewActivityCard } from "@/components/NewActivityCard";
import { useActivities } from "@/contexts/ActivitiesContext";
import { ActivityStatus } from "@/data/activities";
import { summary } from "@/data/summary";
import { styles } from "@/screens/Activity/styles";
import { router } from "expo-router";
import { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Filter = {
    label: string;
    statuses: ActivityStatus[];
};

const FILTERS: Filter[] = [
    { label: "Todas", statuses: ["urgent", "upcoming", "inProgress", "done"] },
    { label: "Pendentes", statuses: ["urgent", "upcoming"] },
    { label: "Em andamento", statuses: ["inProgress"] },
    { label: "Concluídas", statuses: ["done"] },
];

export default function Activity() {
    const { activities } = useActivities();
    const [filter, setFilter] = useState(FILTERS[0]);

    const filteredActivities = activities.filter((activity) =>
        filter.statuses.includes(activity.status)
    );

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
                        <FilterChip key={item.label}
                            label={item.label}
                            selected={item === filter}
                            onPress={() => setFilter(item)}
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
