import { colors } from "@/styles/colors";
import { shadows } from "@/styles/shadows";
import { StyleSheet } from "react-native";

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
