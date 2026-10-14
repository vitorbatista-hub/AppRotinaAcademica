import { BackHeader } from "@/components/BackHeader";
import { ExamForm } from "@/components/ExamForm";
import { useExams } from "@/contexts/ExamsContext";
import { ExamInput } from "@/data/exams";
import { styles } from "@/screens/NewActivity/styles";
import { colors } from "@/styles/colors";
import { formatDate, parseIsoDate } from "@/utils/date";
import { router, useLocalSearchParams } from "expo-router";
import { Alert, ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function EditExam() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const { exams, updateExam, deleteExam } = useExams();

    const exam = exams.find((item) => item.id === id);

    async function handleSubmit(values: ExamInput) {
        await updateExam(id, values);
        router.back();
    }

    async function handleDelete() {
        // Volta antes de apagar para a tela não mostrar "Prova não encontrada" por um instante.
        router.back();
        await deleteExam(id);
    }

    function confirmDelete() {
        Alert.alert(
            "Excluir prova",
            `Tem certeza que deseja excluir "${exam?.title}"? Essa ação não pode ser desfeita.`,
            [
                { text: "Cancelar", style: "cancel" },
                { text: "Excluir", style: "destructive", onPress: handleDelete },
            ]
        );
    }

    return (
        <SafeAreaView style={styles.container} edges={["top"]}>
            <BackHeader title="Minha Rotina"
                color={colors.primary}
                actionIcon="trash-outline"
                actionLabel="Excluir prova"
                onActionPress={exam ? confirmDelete : undefined}
            />

            <ScrollView contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
                automaticallyAdjustKeyboardInsets
            >
                <Text style={styles.title}>Editar Prova</Text>

                {exam ? (
                    <ExamForm submitLabel="Salvar alterações"
                        initialValues={{
                            title: exam.title,
                            discipline: exam.discipline,
                            date: formatDate(parseIsoDate(exam.date)),
                            notes: exam.notes,
                        }}
                        onSubmit={handleSubmit}
                    />
                ) : (
                    <Text>Prova não encontrada.</Text>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}
