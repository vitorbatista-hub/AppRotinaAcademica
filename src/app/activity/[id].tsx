import { BackHeader } from "@/components/BackHeader";
import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { InfoCard } from "@/components/InfoCard";
import { TipCard } from "@/components/TipCard";
import { useActivities } from "@/contexts/ActivitiesContext";
import { ActivityPriority, ActivityStatus } from "@/data/activities";
import { styles } from "@/screens/ActivityDetails/styles";
import { NOT_STARTED_STATUSES } from "@/utils/activityStatus";
import { colors } from "@/styles/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router, useLocalSearchParams } from "expo-router";
import { Alert, ScrollView, Text, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

type BadgeStyle = {
    label: string;
    icon: keyof typeof Ionicons.glyphMap;
    color: string;
    backgroundColor: string;
};

const NOT_STARTED_BADGE: BadgeStyle = {
    label: "Não iniciada",
    icon: "time-outline",
    color: colors.text.secondary,
    backgroundColor: colors.background.gray,
};

const STATUS_BADGES: Record<ActivityStatus, BadgeStyle> = {
    late: {
        label: "Atrasada",
        icon: "alert-circle-outline",
        color: colors.text.error,
        backgroundColor: colors.background.error,
    },
    urgent: NOT_STARTED_BADGE,
    upcoming: NOT_STARTED_BADGE,
    inProgress: {
        label: "Em andamento",
        icon: "sync",
        color: colors.primary,
        backgroundColor: colors.background.blue,
    },
    done: {
        label: "Concluída",
        icon: "checkmark-circle",
        color: colors.text.green,
        backgroundColor: colors.background.green,
    },
};

const PRIORITY_BADGES: Record<ActivityPriority, BadgeStyle> = {
    low: {
        label: "Baixa Prioridade",
        icon: "arrow-down",
        color: colors.text.secondary,
        backgroundColor: colors.background.gray,
    },
    medium: {
        label: "Média Prioridade",
        icon: "remove",
        color: colors.text.amber,
        backgroundColor: colors.background.amber,
    },
    high: {
        label: "Alta Prioridade",
        icon: "alert",
        color: colors.text.error,
        backgroundColor: colors.background.error,
    },
};

const STUDY_TIP = "Comece esta atividade com antecedência para evitar atrasos na entrega.";

export default function ActivityDetails() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const { activities, startActivity, completeActivity, reopenActivity, deleteActivity } = useActivities();
    const insets = useSafeAreaInsets();

    const activity = activities.find((item) => item.id === id);

    if (!activity) {
        return (
            <SafeAreaView style={styles.container} edges={["top"]}>
                <BackHeader title="Detalhes" actionIcon="ellipsis-vertical" actionLabel="Mais opções" />
                <Text style={styles.empty}>Atividade não encontrada.</Text>
            </SafeAreaView>
        );
    }

    const isDone = activity.status === "done";
    const isNotStarted = NOT_STARTED_STATUSES.includes(activity.status);
    const isDueSoon = activity.status === "urgent" || activity.status === "late";

    async function handleStart() {
        await startActivity(activity!.id);
    }

    async function handleComplete() {
        await completeActivity(activity!.id);
        router.back();
    }

    function handleEdit() {
        router.push({ pathname: "/activity/edit/[id]", params: { id: activity!.id } });
    }

    async function handleDelete() {
        // Volta antes de apagar para a tela não mostrar "Atividade não encontrada" por um instante.
        router.back();
        await deleteActivity(activity!.id);
    }

    function confirmDelete() {
        Alert.alert(
            "Excluir atividade",
            `Tem certeza que deseja excluir "${activity!.title}"? Essa ação não pode ser desfeita.`,
            [
                { text: "Cancelar", style: "cancel" },
                { text: "Excluir", style: "destructive", onPress: handleDelete },
            ]
        );
    }

    function handleMoreOptions() {
        // Desfaz o "Iniciar" ou o "Concluir" caso o usuário tenha tocado sem querer.
        const reopenOption = isNotStarted
            ? []
            : [{ text: isDone ? "Reabrir atividade" : "Marcar como não iniciada", onPress: () => reopenActivity(activity!.id) }];

        Alert.alert(activity!.title, undefined, [
            ...reopenOption,
            { text: "Editar", onPress: handleEdit },
            { text: "Excluir", style: "destructive", onPress: confirmDelete },
            { text: "Cancelar", style: "cancel" },
        ]);
    }

    return (
        <SafeAreaView style={styles.container} edges={["top"]}>
            <BackHeader title="Detalhes"
                actionIcon="ellipsis-vertical"
                actionLabel="Mais opções"
                onActionPress={handleMoreOptions}
            />

            <ScrollView contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.heading}>
                    <View style={styles.badges}>
                        <Badge {...STATUS_BADGES[activity.status]} />
                        <Badge {...PRIORITY_BADGES[activity.priority]} />
                    </View>
                    <Text style={styles.title}>{activity.title}</Text>
                </View>

                <View style={styles.infoCards}>
                    <InfoCard label="Disciplina" value={activity.discipline} icon="book-outline" />
                    <InfoCard label="Entrega"
                        value={activity.dueLabel}
                        icon="calendar-outline"
                        valueColor={isDueSoon ? colors.red : undefined}
                    />
                </View>

                {!isDone && <TipCard title="Dica de Estudo" text={STUDY_TIP} />}

                <View style={styles.description}>
                    <View style={styles.descriptionHeader}>
                        <Ionicons name="reader-outline" size={18} color={colors.primary} />
                        <Text style={styles.descriptionTitle}>Descrição da Tarefa</Text>
                    </View>
                    <Text style={styles.descriptionText}>
                        {activity.description || "Nenhuma descrição informada."}
                    </Text>
                </View>
            </ScrollView>

            <View style={[styles.actions, { paddingBottom: insets.bottom + 16 }]}>
                {!isDone && (
                    <Button text="Marcar como concluída"
                        color={colors.green}
                        icon={<Ionicons name="checkmark-circle-outline" size={20} color={colors.white} />}
                        textStyle={styles.actionText}
                        style={styles.completeButton}
                        onPress={handleComplete}
                    />
                )}
                <View style={styles.secondaryActions}>
                    {isNotStarted && (
                        <Button text="Iniciar"
                            color={colors.primary}
                            variant="outlined"
                            icon={<Ionicons name="play-outline" size={18} color={colors.primary} />}
                            textStyle={styles.actionText}
                            style={styles.secondaryAction}
                            onPress={handleStart}
                        />
                    )}
                    <Button text={isNotStarted ? "Editar" : "Editar atividade"}
                        color={colors.text.secondary}
                        variant="outlined"
                        icon={<Ionicons name="create-outline" size={18} color={colors.text.secondary} />}
                        textStyle={styles.actionText}
                        style={styles.secondaryAction}
                        onPress={handleEdit}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}
