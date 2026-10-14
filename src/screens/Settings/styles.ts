import { colors } from "@/styles/colors";
import { fontFamily } from "@/styles/fontFamily";
import { textSize } from "@/styles/fontSize";
import { shadows } from "@/styles/shadows";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.background.primary,
        flex: 1,
    },

    content: {
        gap: 32,
        paddingTop: 32,
        paddingBottom: 48,
        paddingHorizontal: 20,
    },

    title: {
        color: colors.text.primary,
        fontSize: textSize.title,
        fontFamily: fontFamily.bold,
        lineHeight: 36,
    },

    section: {
        gap: 12,
    },

    sectionTitle: {
        color: colors.text.secondary,
        fontFamily: fontFamily.semiBold,
        fontSize: textSize.caption,
        lineHeight: 16,
        letterSpacing: 0.5,
        textTransform: "uppercase",
    },

    card: {
        borderRadius: 16,
        borderWidth: 1,
        borderColor: colors.borderLight,
        backgroundColor: colors.white,
        boxShadow: shadows.card,
        overflow: "hidden",
    },

    divider: {
        height: 1,
        marginLeft: 64,
        backgroundColor: colors.borderCard,
    },
});
