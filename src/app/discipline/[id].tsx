import { ActivityCard } from "@/components/ActivityCard";
import { BackHeader } from "@/components/BackHeader";
import { ExamCard } from "@/components/ExamCard";
import { InfoCard } from "@/components/InfoCard";
import { useActivities } from "@/contexts/ActivitiesContext";
import { useDisciplines } from "@/contexts/DisciplinesContext";
import { useExams } from "@/contexts/ExamsContext";
import { styles } from "@/screens/DisciplineDetails/styles";
import { colors } from "@/styles/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router, useLocalSearchParams } from "expo-router";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function plural(count: number, singular: string, pluralForm: string) {
    return `${count} ${count === 1 ? singular : pluralForm}`;
}

export default function DisciplineDetails() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const { disciplines, deleteDiscipline } = useDisciplines();
    const { activities } = useActivities();
    const { exams } = useExams();

    const discipline = disciplines.find((item) => item.id === id);

    if (!discipline) {
        return (
            <SafeAreaView style={styles.container} edges={["top"]}>
                <BackHeader title="Disciplina" actionIcon="ellipsis-vertical" actionLabel="Mais opções" />
                <Text style={styles.empty}>Disciplina não encontrada.</Text>
            </SafeAreaView>
        );
    }

    // As listas já vêm ordenadas do banco: provas por data e atividades com as concluídas no fim.
    const disciplineActivities = activities.filter((activity) => activity.disciplineId === discipline.id);
    const disciplineExams = exams.filter((exam) => exam.disciplineId === discipline.id);

    function handleEdit() {
        router.push({ pathname: "/discipline/edit/[id]", params: { id: discipline!.id } });
    }

    async function handleDelete() {
        // Volta antes de apagar para a tela não mostrar "Disciplina não encontrada" por um instante.
        router.back();
        await deleteDiscipline(discipline!.id);
    }

    function confirmDelete() {
        const related = [
            disciplineActivities.length > 0 && plural(disciplineActivities.length, "atividade", "atividades"),
            disciplineExams.length > 0 && plural(disciplineExams.length, "prova", "provas"),
        ].filter(Boolean);
        const relatedCount = disciplineActivities.length + disciplineExams.length;
        const relatedWarning = relatedCount > 0
            ? ` ${related.join(" e ")} dessa disciplina também ${relatedCount === 1 ? "será excluída" : "serão excluídas"}.`
            : "";

        Alert.alert(
            "Excluir disciplina",
            `Tem certeza que deseja excluir "${discipline!.name}"?${relatedWarning} Essa ação não pode ser desfeita.`,
            [
                { text: "Cancelar", style: "cancel" },
                { text: "Excluir", style: "destructive", onPress: handleDelete },
            ]
        );
    }

    function handleMoreOptions() {
        Alert.alert(discipline!.name, undefined, [
            { text: "Editar", onPress: handleEdit },
            { text: "Excluir", style: "destructive", onPress: confirmDelete },
            { text: "Cancelar", style: "cancel" },
        ]);
    }

    return (
        <SafeAreaView style={styles.container} edges={["top"]}>
            <BackHeader title="Disciplina"
                actionIcon="ellipsis-vertical"
                actionLabel="Mais opções"
                onActionPress={handleMoreOptions}
            />

            <ScrollView contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.heading}>
                    <View style={[styles.icon, { backgroundColor: discipline.color }]}>
                        <Ionicons name={discipline.icon} size={28} color={colors.white} />
                    </View>
                    <Text style={styles.title}>{discipline.name}</Text>
                </View>

                <View style={styles.infoCards}>
                    <View style={styles.infoRow}>
                        <InfoCard label="Professor" value={discipline.teacher} icon="person-outline" />
                        <InfoCard label="Sala" value={discipline.room} icon="business-outline" />
                    </View>
                    <InfoCard label="Horário" value={discipline.schedule} icon="time-outline" />
                </View>

                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Provas</Text>
                        <TouchableOpacity activeOpacity={0.7}
                            hitSlop={12}
                            onPress={() => router.push({ pathname: "/exam/new", params: { disciplineId: discipline.id } })}
                            accessibilityRole="button"
                            accessibilityLabel={`Adicionar prova de ${discipline.name}`}
                        >
                            <Text style={styles.sectionLink}>Adicionar prova</Text>
                        </TouchableOpacity>
                    </View>

                    {disciplineExams.map((exam) => (
                        <ExamCard key={exam.id}
                            exam={exam}
                            onPress={() => router.push({ pathname: "/exam/edit/[id]", params: { id: exam.id } })}
                        />
                    ))}

                    {disciplineExams.length === 0 && (
                        <Text style={styles.sectionEmpty}>Nenhuma prova cadastrada.</Text>
                    )}
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Atividades</Text>

                    {disciplineActivities.map((activity) => (
                        <ActivityCard key={activity.id}
                            activity={activity}
                            onDetailsPress={() => router.push({
                                pathname: "/activity/[id]",
                                params: { id: activity.id },
                            })}
                        />
                    ))}

                    {disciplineActivities.length === 0 && (
                        <Text style={styles.sectionEmpty}>Nenhuma atividade cadastrada.</Text>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
