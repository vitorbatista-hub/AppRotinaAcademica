import { Button } from "@/components/Button";
import { colors } from "@/styles/colors";
import { formatDate, parseDate } from "@/utils/date";
import Ionicons from "@expo/vector-icons/Ionicons";
import DateTimePicker, { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { useState } from "react";
import { Modal, Platform, Pressable, Text, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { styles } from "./styles";

type DateInputProps = {
    // Data no formato dd/mm/aaaa, o mesmo que os formulários já validam e salvam.
    value: string;
    placeholder: string;
    hasError?: boolean;
    accessibilityLabel: string;
    onChange: (date: string) => void;
};

export function DateInput({ value, placeholder, hasError = false, accessibilityLabel, onChange }: DateInputProps) {
    const [isOpen, setIsOpen] = useState(false);
    // No iOS a data só vale depois de tocar em "Confirmar"; até lá fica guardada aqui.
    const [draft, setDraft] = useState(new Date());
    const insets = useSafeAreaInsets();

    const selected = parseDate(value);

    function handleOpen() {
        const initial = selected ?? new Date();

        // No Android o calendário é um diálogo do sistema, aberto por função e não por componente.
        if (Platform.OS === "android") {
            DateTimePickerAndroid.open({
                value: initial,
                mode: "date",
                onValueChange: (_, date) => onChange(formatDate(date)),
            });
            return;
        }

        setDraft(initial);
        setIsOpen(true);
    }

    function handleConfirm() {
        onChange(formatDate(draft));
        setIsOpen(false);
    }

    return (
        <>
            <TouchableOpacity activeOpacity={0.7}
                style={[styles.container, hasError && styles.containerError]}
                onPress={handleOpen}
                accessibilityRole="button"
                accessibilityLabel={accessibilityLabel}
                accessibilityValue={{ text: value || placeholder }}
            >
                <Text style={[styles.value, !value && styles.placeholder]}>{value || placeholder}</Text>
                <Ionicons name="calendar-outline" size={18} color={colors.text.secondary} />
            </TouchableOpacity>

            {Platform.OS === "ios" && (
                <Modal visible={isOpen}
                    transparent
                    animationType="fade"
                    onRequestClose={() => setIsOpen(false)}
                >
                    <Pressable style={styles.overlay}
                        onPress={() => setIsOpen(false)}
                        accessibilityLabel="Fechar calendário"
                    >
                        {/* O onPress vazio impede que um toque no calendário feche o modal. */}
                        <Pressable style={[styles.sheet, { paddingBottom: insets.bottom + 16 }]} onPress={() => { }}>
                            <Text style={styles.sheetTitle}>{accessibilityLabel}</Text>

                            <DateTimePicker value={draft}
                                mode="date"
                                display="inline"
                                locale="pt-BR"
                                accentColor={colors.primary}
                                themeVariant="light"
                                onValueChange={(_, date) => setDraft(date)}
                            />

                            <Button text="Confirmar" color={colors.primary} onPress={handleConfirm} />
                        </Pressable>
                    </Pressable>
                </Modal>
            )}
        </>
    );
}
