import { ActivityCard } from "@/components/ActivityCard";
import { FilterChip } from "@/components/FilterChip";
import { Header } from "@/components/Header";
import { NewActivityCard } from "@/components/NewActivityCard";
import { SearchInput } from "@/components/SearchInput";
import { useActivities } from "@/contexts/ActivitiesContext";
import { ActivityDetail } from "@/data/activities";
import { styles } from "@/screens/Activity/styles";
import { isDueThisWeek, NOT_STARTED_STATUSES } from "@/utils/activityStatus";
import { matchesSearch } from "@/utils/text";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
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

    const [search, setSearch] = useState("");

    // A busca soma com o filtro: "Esta semana" + "cálculo" mostra só as de cálculo da semana.
    const filteredActivities = activities.filter((activity) =>
        filter.matches(activity) && matchesSearch(search, [activity.title, activity.discipline, activity.description])
    );

    return (
        <SafeAreaView style={styles.container} edges={["top"]}>
            <Header />

            <ScrollView contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                <View style={styles.titleContent}>
                    <Text style={styles.title}>Atividades e Prazos</Text>
                    <Text style={styles.subtitle}>
                        Acompanhe suas entregas e mantenha sua rotina em dia.
                    </Text>
                </View>

                <SearchInput value={search}
                    onChangeText={setSearch}
                    placeholder="Buscar atividade ou disciplina..."
                    accessibilityLabel="Buscar atividade ou disciplina"
                />

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
