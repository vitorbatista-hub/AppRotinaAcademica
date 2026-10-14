import { BackHeader } from "@/components/BackHeader";
import { DisciplineForm } from "@/components/DisciplineForm";
import { useDisciplines } from "@/contexts/DisciplinesContext";
import { DisciplineInput } from "@/data/disciplines";
import { styles } from "@/screens/NewActivity/styles";
import { colors } from "@/styles/colors";
import { router, useLocalSearchParams } from "expo-router";
import { ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function EditDiscipline() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const { disciplines, updateDiscipline } = useDisciplines();

    const discipline = disciplines.find((item) => item.id === id);

    async function handleSubmit(values: DisciplineInput) {
        await updateDiscipline(id, values);
        router.back();
    }

    return (
        <SafeAreaView style={styles.container} edges={["top"]}>
            <BackHeader title="Minha Rotina"
                color={colors.primary}
                actionIcon="notifications-outline"
                actionLabel="Notificações"
            />

            <ScrollView contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
                automaticallyAdjustKeyboardInsets
            >
                <Text style={styles.title}>Editar Disciplina</Text>

                {discipline ? (
                    <DisciplineForm disciplineId={discipline.id}
                        submitLabel="Salvar alterações"
                        initialValues={{
                            name: discipline.name,
                            teacher: discipline.teacher,
                            schedule: discipline.schedule,
                            room: discipline.room,
                            color: discipline.color,
                            icon: discipline.icon,
                        }}
                        onSubmit={handleSubmit}
                    />
                ) : (
                    <Text>Disciplina não encontrada.</Text>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}
