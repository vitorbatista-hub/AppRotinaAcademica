import { colors } from "@/styles/colors";
import { fontFamily } from "@/styles/fontFamily";
import { textSize } from "@/styles/fontSize";
import { shadows } from "@/styles/shadows";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        gap: 16,
        padding: 24,
        borderRadius: 12,
        borderWidth: 1,
        borderLeftWidth: 4,
        borderColor: colors.borderCard,
        backgroundColor: colors.white,
        boxShadow: shadows.card,
    },

    containerDone: {
        opacity: 0.8,
    },

    header: {
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: 12,
    },

    badge: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 999,
    },

    caption: {
        color: colors.text.secondary,
        fontFamily: fontFamily.medium,
        fontSize: textSize.caption,
        lineHeight: 16,
        letterSpacing: 0.5,
    },

    info: {
        gap: 4,
    },

    title: {
        color: colors.text.primary,
        fontFamily: fontFamily.semiBold,
        fontSize: textSize.section,
        lineHeight: 24,
    },

    description: {
        color: colors.text.secondary,
        fontFamily: fontFamily.regular,
        fontSize: textSize.body,
        lineHeight: 20,
    },

    footer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12,
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: colors.borderCard,
    },

    discipline: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },

    disciplineText: {
        flexShrink: 1,
    },

    actions: {
        flexDirection: "row",
        alignItems: "center",
        gap: 16,
    },

    delivered: {
        color: colors.green,
    },

    link: {
        color: colors.primary,
    },
});
