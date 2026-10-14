import { colors } from "@/styles/colors";
import { shadows } from "@/styles/shadows";
import { StyleSheet } from "react-native";

const OPTION_SIZE = 40;

export const styles = StyleSheet.create({
    form: {
        gap: 24,
        padding: 24,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: colors.borderLight,
        backgroundColor: colors.white,
        boxShadow: shadows.card,
    },

    options: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 12,
    },

    color: {
        width: OPTION_SIZE,
        height: OPTION_SIZE,
        borderRadius: OPTION_SIZE / 2,
        alignItems: "center",
        justifyContent: "center",
    },

    // O anel branco com contorno escuro deixa a cor escolhida visível em qualquer tom.
    colorSelected: {
        borderWidth: 3,
        borderColor: colors.white,
        boxShadow: `0 0 0 2px ${colors.text.primary}`,
    },

    icon: {
        width: OPTION_SIZE,
        height: OPTION_SIZE,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: colors.border,
        backgroundColor: colors.white,
    },

    footer: {
        marginTop: 8,
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: colors.borderCard,
    },

    saveButton: {
        boxShadow: shadows.input,
    },
});
