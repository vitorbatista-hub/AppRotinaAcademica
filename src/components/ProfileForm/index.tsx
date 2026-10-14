import { Button } from "@/components/Button";
import { FormField } from "@/components/FormField";
import { Input } from "@/components/Input";
import { ProfileInput } from "@/data/profile";
import { colors } from "@/styles/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import { View } from "react-native";
import { styles } from "./styles";

type ProfileFormProps = {
    initialValues: ProfileInput;
    onSubmit: (profile: ProfileInput) => Promise<void>;
};

type FormErrors = Partial<Record<keyof ProfileInput, string>>;

export function ProfileForm({ initialValues, onSubmit }: ProfileFormProps) {
    const [name, setName] = useState(initialValues.name);
    const [course, setCourse] = useState(initialValues.course);
    const [semester, setSemester] = useState(initialValues.semester);
    const [wasSubmitted, setWasSubmitted] = useState(false);

    const formErrors: FormErrors = {
        name: name.trim() ? undefined : "Informe seu nome.",
        course: course.trim() ? undefined : "Informe seu curso.",
        semester: semester.trim() ? undefined : "Informe o semestre.",
    };
    // Os erros só aparecem depois da primeira tentativa de salvar.
    const errors = wasSubmitted ? formErrors : {};

    async function handleSave() {
        setWasSubmitted(true);

        if (Object.values(formErrors).some(Boolean)) {
            return;
        }

        await onSubmit({
            name: name.trim(),
            course: course.trim(),
            semester: semester.trim(),
        });
    }

    return (
        <View style={styles.form}>
            <FormField label="Nome" error={errors.name}>
                <Input value={name}
                    onChangeText={setName}
                    placeholder="Ex: Ana Souza"
                    autoCapitalize="words"
                    hasError={!!errors.name}
                    accessibilityLabel="Nome"
                />
            </FormField>

            <FormField label="Curso" error={errors.course}>
                <Input value={course}
                    onChangeText={setCourse}
                    placeholder="Ex: Sistemas de Informação"
                    icon="school-outline"
                    hasError={!!errors.course}
                    accessibilityLabel="Curso"
                />
            </FormField>

            <FormField label="Semestre" error={errors.semester}>
                <Input value={semester}
                    onChangeText={setSemester}
                    placeholder="Ex: 2º/2026"
                    icon="calendar-outline"
                    hasError={!!errors.semester}
                    accessibilityLabel="Semestre"
                />
            </FormField>

            <View style={styles.footer}>
                <Button text="Salvar alterações"
                    color={colors.info}
                    icon={<Ionicons name="save-outline" size={18} color={colors.white} />}
                    style={styles.saveButton}
                    onPress={handleSave}
                />
            </View>
        </View>
    );
}
