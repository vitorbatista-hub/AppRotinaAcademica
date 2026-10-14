import { colors } from "@/styles/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import { Modal, Pressable, ScrollView, Text, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { styles } from "./styles";

type SelectProps = {
    value?: string;
    options: string[];
    placeholder: string;
    hasError?: boolean;
    onChange: (option: string) => void;
};

export function Select({ value, options, placeholder, hasError = false, onChange }: SelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const insets = useSafeAreaInsets();

    function handleSelect(option: string) {
        onChange(option);
        setIsOpen(false);
    }

    return (
        <>
            <TouchableOpacity activeOpacity={0.7}
                style={[styles.container, hasError && styles.containerError]}
                onPress={() => setIsOpen(true)}
                accessibilityRole="button"
                accessibilityLabel={value ?? placeholder}
            >
                <Text style={styles.value} numberOfLines={1}>{value ?? placeholder}</Text>
                <Ionicons name="chevron-down" size={16} color={colors.text.secondary} />
            </TouchableOpacity>

            <Modal visible={isOpen}
                transparent
                animationType="fade"
                onRequestClose={() => setIsOpen(false)}
            >
                <Pressable style={styles.overlay}
                    onPress={() => setIsOpen(false)}
                    accessibilityLabel="Fechar lista"
                >
                    {/* O onPress vazio impede que um toque na lista feche o modal. */}
                    <Pressable style={[styles.sheet, { paddingBottom: insets.bottom + 16 }]} onPress={() => { }}>
                        <Text style={styles.sheetTitle}>{placeholder}</Text>

                        <ScrollView showsVerticalScrollIndicator={false}>
                            {options.map((option) => {
                                const isSelected = option === value;

                                return (
                                    <TouchableOpacity key={option}
                                        activeOpacity={0.7}
                                        style={styles.option}
                                        onPress={() => handleSelect(option)}
                                        accessibilityRole="button"
                                        accessibilityState={{ selected: isSelected }}
                                    >
                                        <Text style={[styles.optionText, isSelected && styles.optionTextSelected]}>
                                            {option}
                                        </Text>
                                        {isSelected && <Ionicons name="checkmark" size={18} color={colors.primary} />}
                                    </TouchableOpacity>
                                );
                            })}
                        </ScrollView>
                    </Pressable>
                </Pressable>
            </Modal>
        </>
    );
}
