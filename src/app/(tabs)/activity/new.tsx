import { BackHeader } from "@/components/BackHeader";
import { Button } from "@/components/Button";
import { FormField } from "@/components/FormField";
import { Input } from "@/components/Input";
import { OptionSelector } from "@/components/OptionSelector";
import { Select } from "@/components/Select";
import { useActivities } from "@/contexts/ActivitiesContext";
import { useDisciplines } from "@/contexts/DisciplinesContext";
import { ActivityPriority } from "@/data/activities";
import { styles } from "@/screens/NewActivity/styles";
import { colors } from "@/styles/colors";
import { isPastDate, maskDate, parseDate, toIsoDate } from "@/utils/date";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type FormErrors = {
    title?: string;
    discipline?: string;
    dueDate?: string;
};

const PRIORITIES: { label: string; value: ActivityPriority; color: string; backgroundColor: string }[] = [
    { label: "Baixa", value: "low", color: colors.text.secondary, backgroundColor: colors.background.gray },
    { label: "Média", value: "medium", color: colors.text.amber, backgroundColor: colors.background.amber },
    { label: "Alta", value: "high", color: colors.text.error, backgroundColor: colors.background.error },
];

function getDueDateError(dueDate: string) {
    const date = parseDate(dueDate);

    if (!date) {
        return "Informe uma data válida no formato dd/mm/aaaa.";
    }
    if (isPastDate(date)) {
        return "A data de entrega já passou.";
    }
}

export default function NewActivity() {
    const { addActivity } = useActivities();
    const { disciplines } = useDisciplines();

    const [title, setTitle] = useState("");
    const [discipline, setDiscipline] = useState<string>();
    const [dueDate, setDueDate] = useState("");
    const [priority, setPriority] = useState<ActivityPriority>("medium");
    const [description, setDescription] = useState("");
    const [wasSubmitted, setWasSubmitted] = useState(false);

    const selectedDiscipline = disciplines.find((item) => item.name === discipline);
    const date = parseDate(dueDate);

    const formErrors: FormErrors = {
        title: title.trim() ? undefined : "Informe o título da atividade.",
        discipline: selectedDiscipline ? undefined : "Selecione uma disciplina.",
        dueDate: getDueDateError(dueDate),
    };
    // Os erros só aparecem depois da primeira tentativa de salvar.
    const errors = wasSubmitted ? formErrors : {};

    async function handleSave() {
        setWasSubmitted(true);

        if (!selectedDiscipline || !date || Object.values(formErrors).some(Boolean)) {
            return;
        }

        await addActivity({
            title: title.trim(),
            description: description.trim(),
            disciplineId: selectedDiscipline.id,
            dueDate: toIsoDate(date),
            priority,
        });
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
                <Text style={styles.title}>Nova Atividade</Text>

                <View style={styles.form}>
                    <FormField label="Título da Atividade" error={errors.title}>
                        <Input value={title}
                            onChangeText={setTitle}
                            placeholder="Ex: Lista de Exercícios 3"
                            hasError={!!errors.title}
                            accessibilityLabel="Título da atividade"
                        />
                    </FormField>

                    <FormField label="Disciplina" error={errors.discipline}>
                        <Select value={discipline}
                            onChange={setDiscipline}
                            options={disciplines.map((item) => item.name)}
                            placeholder="Selecione uma disciplina"
                            hasError={!!errors.discipline}
                        />
                    </FormField>

                    <FormField label="Data de entrega" error={errors.dueDate}>
                        <Input value={dueDate}
                            onChangeText={(text) => setDueDate(maskDate(text))}
                            placeholder="dd/mm/aaaa"
                            keyboardType="number-pad"
                            maxLength={10}
                            icon="calendar-outline"
                            hasError={!!errors.dueDate}
                            accessibilityLabel="Data de entrega"
                        />
                    </FormField>

                    <FormField label="Prioridade">
                        <OptionSelector options={PRIORITIES} value={priority} onChange={setPriority} />
                    </FormField>

                    <FormField label="Descrição (Opcional)">
                        <Input value={description}
                            onChangeText={setDescription}
                            placeholder="Adicione detalhes, links ou observações importantes sobre esta atividade..."
                            multiline
                            accessibilityLabel="Descrição"
                        />
                    </FormField>

                    <View style={styles.footer}>
                        <Button text="Salvar atividade"
                            color={colors.info}
                            icon={<Ionicons name="save-outline" size={18} color={colors.white} />}
                            style={styles.saveButton}
                            onPress={handleSave}
                        />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
