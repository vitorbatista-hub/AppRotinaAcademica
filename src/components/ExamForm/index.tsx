import { Button } from "@/components/Button";
import { DateInput } from "@/components/DateInput";
import { FormField } from "@/components/FormField";
import { Input } from "@/components/Input";
import { Select } from "@/components/Select";
import { useDisciplines } from "@/contexts/DisciplinesContext";
import { ExamInput } from "@/data/exams";
import { colors } from "@/styles/colors";
import { isPastDate, parseDate, toIsoDate } from "@/utils/date";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import { Alert, View } from "react-native";
import { styles } from "./styles";

// Valores que o formulário começa preenchido; a data vem no formato dd/mm/aaaa.
export type ExamFormValues = {
    title: string;
    discipline?: string;
    date: string;
    notes: string;
};

type ExamFormProps = {
    initialValues?: ExamFormValues;
    submitLabel: string;
    onSubmit: (exam: ExamInput) => Promise<void>;
};

type FormErrors = {
    title?: string;
    discipline?: string;
    date?: string;
};

const EMPTY_VALUES: ExamFormValues = {
    title: "",
    date: "",
    notes: "",
};

export function ExamForm({ initialValues = EMPTY_VALUES, submitLabel, onSubmit }: ExamFormProps) {
    const { disciplines } = useDisciplines();

    const [title, setTitle] = useState(initialValues.title);
    const [discipline, setDiscipline] = useState(initialValues.discipline);
    const [date, setDate] = useState(initialValues.date);
    const [notes, setNotes] = useState(initialValues.notes);
    const [wasSubmitted, setWasSubmitted] = useState(false);

    const selectedDiscipline = disciplines.find((item) => item.name === discipline);
    const parsedDate = parseDate(date);

    const formErrors: FormErrors = {
        title: title.trim() ? undefined : "Informe o nome da prova.",
        discipline: selectedDiscipline ? undefined : "Selecione uma disciplina.",
        date: parsedDate ? undefined : "Selecione a data da prova.",
    };
    // Os erros só aparecem depois da primeira tentativa de salvar.
    const errors = wasSubmitted ? formErrors : {};

    async function handleSave() {
        setWasSubmitted(true);

        if (!selectedDiscipline || !parsedDate || Object.values(formErrors).some(Boolean)) {
            return;
        }

        const submit = () => onSubmit({
            title: title.trim(),
            disciplineId: selectedDiscipline.id,
            date: toIsoDate(parsedDate),
            notes: notes.trim(),
        });

        // Data passada é permitida (registrar uma prova que já aconteceu), mas pede confirmação para evitar um toque errado no calendário.
        if (date !== initialValues.date && isPastDate(parsedDate)) {
            Alert.alert(
                "Data já passou",
                "A data informada já passou. Deseja salvar mesmo assim? A prova aparecerá como realizada.",
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
            <FormField label="Nome da Prova" error={errors.title}>
                <Input value={title}
                    onChangeText={setTitle}
                    placeholder="Ex: Prova 1"
                    hasError={!!errors.title}
                    accessibilityLabel="Nome da prova"
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

            <FormField label="Data da prova" error={errors.date}>
                <DateInput value={date}
                    onChange={setDate}
                    placeholder="Selecione a data"
                    hasError={!!errors.date}
                    accessibilityLabel="Data da prova"
                />
            </FormField>

            <FormField label="Conteúdo (Opcional)">
                <Input value={notes}
                    onChangeText={setNotes}
                    placeholder="Assuntos que vão cair, capítulos do livro, materiais permitidos..."
                    multiline
                    accessibilityLabel="Conteúdo"
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
