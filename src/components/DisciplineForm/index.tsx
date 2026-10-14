import { Button } from "@/components/Button";
import { FormField } from "@/components/FormField";
import { Input } from "@/components/Input";
import { useDisciplines } from "@/contexts/DisciplinesContext";
import { DISCIPLINE_COLORS, DISCIPLINE_ICONS, DisciplineInput } from "@/data/disciplines";
import { colors } from "@/styles/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { styles } from "./styles";

type DisciplineFormProps = {
    // Na edição, o id da disciplina, para o nome dela não contar como repetido.
    disciplineId?: string;
    initialValues?: DisciplineInput;
    submitLabel: string;
    onSubmit: (discipline: DisciplineInput) => Promise<void>;
};

type FormErrors = Partial<Record<"name" | "teacher" | "schedule" | "room", string>>;

const EMPTY_VALUES: DisciplineInput = {
    name: "",
    teacher: "",
    schedule: "",
    room: "",
    color: DISCIPLINE_COLORS[0],
    icon: DISCIPLINE_ICONS[0],
};

export function DisciplineForm({ disciplineId, initialValues = EMPTY_VALUES, submitLabel, onSubmit }: DisciplineFormProps) {
    const { disciplines } = useDisciplines();

    const [name, setName] = useState(initialValues.name);
    const [teacher, setTeacher] = useState(initialValues.teacher);
    const [schedule, setSchedule] = useState(initialValues.schedule);
    const [room, setRoom] = useState(initialValues.room);
    const [color, setColor] = useState(initialValues.color);
    const [icon, setIcon] = useState(initialValues.icon);
    const [wasSubmitted, setWasSubmitted] = useState(false);

    // O formulário de atividade escolhe a disciplina pelo nome, então dois nomes iguais confundiriam a lista.
    const isNameTaken = disciplines.some((item) =>
        item.id !== disciplineId && item.name.trim().toLowerCase() === name.trim().toLowerCase()
    );

    const formErrors: FormErrors = {
        name: !name.trim()
            ? "Informe o nome da disciplina."
            : isNameTaken ? "Já existe uma disciplina com esse nome." : undefined,
        teacher: teacher.trim() ? undefined : "Informe o professor.",
        schedule: schedule.trim() ? undefined : "Informe os dias e o horário.",
        room: room.trim() ? undefined : "Informe a sala.",
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
            teacher: teacher.trim(),
            schedule: schedule.trim(),
            room: room.trim(),
            color,
            icon,
        });
    }

    return (
        <View style={styles.form}>
            <FormField label="Nome da Disciplina" error={errors.name}>
                <Input value={name}
                    onChangeText={setName}
                    placeholder="Ex: Cálculo I"
                    hasError={!!errors.name}
                    accessibilityLabel="Nome da disciplina"
                />
            </FormField>

            <FormField label="Professor" error={errors.teacher}>
                <Input value={teacher}
                    onChangeText={setTeacher}
                    placeholder="Ex: Prof. Ana Souza"
                    hasError={!!errors.teacher}
                    accessibilityLabel="Professor"
                />
            </FormField>

            <FormField label="Horário" error={errors.schedule}>
                <Input value={schedule}
                    onChangeText={setSchedule}
                    placeholder="Ex: Seg, Qua 08:00 - 10:00"
                    icon="time-outline"
                    hasError={!!errors.schedule}
                    accessibilityLabel="Horário"
                />
            </FormField>

            <FormField label="Sala" error={errors.room}>
                <Input value={room}
                    onChangeText={setRoom}
                    placeholder="Ex: Sala 302, Bloco C"
                    icon="business-outline"
                    hasError={!!errors.room}
                    accessibilityLabel="Sala"
                />
            </FormField>

            <FormField label="Cor">
                <View style={styles.options}>
                    {DISCIPLINE_COLORS.map((item) => {
                        const isSelected = item === color;

                        return (
                            <TouchableOpacity key={item}
                                activeOpacity={0.7}
                                style={[styles.color, { backgroundColor: item }, isSelected && styles.colorSelected]}
                                onPress={() => setColor(item)}
                                accessibilityRole="button"
                                accessibilityLabel={`Cor ${item}`}
                                accessibilityState={{ selected: isSelected }}
                            >
                                {isSelected && <Ionicons name="checkmark" size={18} color={colors.white} />}
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </FormField>

            <FormField label="Ícone">
                <View style={styles.options}>
                    {DISCIPLINE_ICONS.map((item) => {
                        const isSelected = item === icon;

                        return (
                            <TouchableOpacity key={item}
                                activeOpacity={0.7}
                                style={[styles.icon, isSelected && { borderColor: color, backgroundColor: colors.background.blue }]}
                                onPress={() => setIcon(item)}
                                accessibilityRole="button"
                                accessibilityLabel={`Ícone ${item}`}
                                accessibilityState={{ selected: isSelected }}
                            >
                                <Ionicons name={item} size={20} color={isSelected ? color : colors.text.secondary} />
                            </TouchableOpacity>
                        );
                    })}
                </View>
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
