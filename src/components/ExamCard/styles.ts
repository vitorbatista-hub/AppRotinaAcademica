import { colors } from "@/styles/colors";
import { fontFamily } from "@/styles/fontFamily";
import { textSize } from "@/styles/fontSize";
import { shadows } from "@/styles/shadows";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "flex-start",
        gap: 12,
        padding: 20,
        borderRadius: 12,
        borderWidth: 1,
        borderLeftWidth: 4,
        borderColor: colors.borderCard,
        backgroundColor: colors.white,
        boxShadow: shadows.card,
    },

    containerPast: {
        opacity: 0.7,
    },

    icon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.background.blue,
    },

    info: {
        flex: 1,
        gap: 2,
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

    notes: {
        marginTop: 4,
        color: colors.text.muted,
        fontFamily: fontFamily.regular,
        fontSize: textSize.caption,
        lineHeight: 16,
    },

    when: {
        alignItems: "flex-end",
        gap: 6,
    },

    badge: {
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 999,
        backgroundColor: colors.background.gray,
    },

    badgeWarning: {
        backgroundColor: colors.background.error,
    },

    badgeText: {
        color: colors.text.secondary,
        fontFamily: fontFamily.medium,
        fontSize: textSize.caption,
        lineHeight: 16,
        letterSpacing: 0.5,
    },

    badgeTextWarning: {
        color: colors.text.error,
    },

    date: {
        color: colors.text.secondary,
        fontFamily: fontFamily.medium,
        fontSize: textSize.caption,
        lineHeight: 16,
        letterSpacing: 0.5,
    },
});
