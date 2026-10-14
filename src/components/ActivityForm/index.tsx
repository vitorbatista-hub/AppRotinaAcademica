import { Button } from "@/components/Button";
import { FormField } from "@/components/FormField";
import { Input } from "@/components/Input";
import { OptionSelector } from "@/components/OptionSelector";
import { Select } from "@/components/Select";
import { ActivityInput } from "@/contexts/ActivitiesContext";
import { useDisciplines } from "@/contexts/DisciplinesContext";
import { ActivityPriority } from "@/data/activities";
import { colors } from "@/styles/colors";
import { isPastDate, maskDate, parseDate, toIsoDate } from "@/utils/date";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import { Alert, View } from "react-native";
import { styles } from "./styles";

// Valores que o formulário começa preenchido; a data vem no formato dd/mm/aaaa.
export type ActivityFormValues = {
    title: string;
    discipline?: string;
    dueDate: string;
    priority: ActivityPriority;
    description: string;
};

type ActivityFormProps = {
    initialValues?: ActivityFormValues;
    submitLabel: string;
    onSubmit: (activity: ActivityInput) => Promise<void>;
};

type FormErrors = {
    title?: string;
    discipline?: string;
    dueDate?: string;
};

const EMPTY_VALUES: ActivityFormValues = {
    title: "",
    dueDate: "",
    priority: "medium",
    description: "",
};

const PRIORITIES: { label: string; value: ActivityPriority; color: string; backgroundColor: string }[] = [
    { label: "Baixa", value: "low", color: colors.text.secondary, backgroundColor: colors.background.gray },
    { label: "Média", value: "medium", color: colors.text.amber, backgroundColor: colors.background.amber },
    { label: "Alta", value: "high", color: colors.text.error, backgroundColor: colors.background.error },
];

function getDueDateError(dueDate: string) {
    if (!parseDate(dueDate)) {
        return "Informe uma data válida no formato dd/mm/aaaa.";
    }
}

export function ActivityForm({ initialValues = EMPTY_VALUES, submitLabel, onSubmit }: ActivityFormProps) {
    const { disciplines } = useDisciplines();

    const [title, setTitle] = useState(initialValues.title);
    const [discipline, setDiscipline] = useState(initialValues.discipline);
    const [dueDate, setDueDate] = useState(initialValues.dueDate);
    const [priority, setPriority] = useState(initialValues.priority);
    const [description, setDescription] = useState(initialValues.description);
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

        const submit = () => onSubmit({
            title: title.trim(),
            description: description.trim(),
            disciplineId: selectedDiscipline.id,
            dueDate: toIsoDate(date),
            priority,
        });

        // Data passada é permitida (trabalho entregue com atraso), mas pede confirmação para evitar erro de digitação.
        // Na edição, só pergunta se o usuário mudou a data; a original pode já ter passado.
        if (dueDate !== initialValues.dueDate && isPastDate(date)) {
            Alert.alert(
                "Data já passou",
                "A data de entrega informada já passou. Deseja salvar mesmo assim? A atividade aparecerá como atrasada.",
                [
                    { text: "Corrigir data", style: "cancel" },
                    { text: "Salvar", onPress: submit },
                ]
            );
            return;
        }

        await submit();
    }

    return (
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
                <Button text={submitLabel}
                    color={colors.info}
                    icon={<Ionicons name="save-outline" size={18} color={colors.white} />}
                    style={styles.saveButton}
                    onPress={handleSave}
                />
            </View>
        </View>
    );
}
