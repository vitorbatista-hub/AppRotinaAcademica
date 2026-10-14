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
        gap: 24,
        paddingTop: 16,
        paddingBottom: 24,
        paddingHorizontal: 20,
    },

    heading: {
        gap: 16,
    },

    badges: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 8,
    },

    title: {
        color: colors.text.primary,
        fontSize: textSize.title,
        fontFamily: fontFamily.bold,
        lineHeight: 35,
    },

    infoCards: {
        flexDirection: "row",
        gap: 12,
    },

    description: {
        gap: 16,
        padding: 24,
        borderRadius: 12,
        backgroundColor: colors.white,
        boxShadow: shadows.card,
    },

    descriptionHeader: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        paddingBottom: 12,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },

    descriptionTitle: {
        flex: 1,
        color: colors.text.primary,
        fontFamily: fontFamily.semiBold,
        fontSize: textSize.section,
        lineHeight: 24,
    },

    descriptionText: {
        color: colors.text.secondary,
        fontFamily: fontFamily.regular,
        fontSize: textSize.subtitle,
        lineHeight: 24,
    },

    actions: {
        gap: 12,
        paddingTop: 16,
        paddingHorizontal: 20,
        borderTopWidth: 1,
        borderTopColor: colors.borderCard,
        backgroundColor: colors.white,
    },

    actionText: {
        fontFamily: fontFamily.medium,
        fontSize: textSize.caption,
        lineHeight: 16,
        letterSpacing: 0.6,
        textTransform: "uppercase",
    },

    completeButton: {
        boxShadow: shadows.card,
    },

    empty: {
        padding: 20,
        color: colors.text.secondary,
        fontFamily: fontFamily.regular,
        fontSize: textSize.body,
        lineHeight: 20,
        textAlign: "center",
    },
});
