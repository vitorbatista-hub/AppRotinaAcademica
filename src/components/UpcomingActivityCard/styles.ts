import { colors } from "@/styles/colors";
import { fontFamily } from "@/styles/fontFamily";
import { textSize } from "@/styles/fontSize";
import { shadows } from "@/styles/shadows";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: 12,
        padding: 24,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: colors.borderLight,
        backgroundColor: colors.white,
        boxShadow: shadows.card,
    },

    info: {
        flex: 1,
        alignItems: "flex-start",
        gap: 4,
    },

    badge: {
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 999,
        backgroundColor: colors.background.gray,
    },

    badgeWarning: {
        backgroundColor: colors.background.red,
    },

    badgeText: {
        color: colors.text.secondary,
        fontFamily: fontFamily.medium,
        fontSize: textSize.caption,
        lineHeight: 16,
        letterSpacing: 0.5,
    },

    badgeTextWarning: {
        color: colors.text.orange,
    },

    title: {
        color: colors.text.primary,
        fontFamily: fontFamily.bold,
        fontSize: textSize.subtitle,
        lineHeight: 24,
    },

    discipline: {
        color: colors.text.secondary,
        fontFamily: fontFamily.regular,
        fontSize: textSize.body,
        lineHeight: 20,
    },

    due: {
        color: colors.text.secondary,
        fontFamily: fontFamily.medium,
        fontSize: textSize.caption,
        lineHeight: 16,
        letterSpacing: 0.5,
    },

    dueWarning: {
        color: colors.orange,
        fontFamily: fontFamily.semiBold,
    },
});
