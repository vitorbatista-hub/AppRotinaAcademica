import { colors } from "@/styles/colors";
import { fontFamily } from "@/styles/fontFamily";
import { textSize } from "@/styles/fontSize";
import { shadows } from "@/styles/shadows";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        gap: 16,
        padding: 24,
        borderRadius: 16,
        borderWidth: 1,
        borderLeftWidth: 4,
        borderColor: colors.borderCard,
        backgroundColor: colors.white,
        boxShadow: shadows.card,
    },

    header: {
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: 16,
    },

    info: {
        flex: 1,
        gap: 4,
    },

    name: {
        color: colors.text.primary,
        fontFamily: fontFamily.semiBold,
        fontSize: textSize.section,
        lineHeight: 24,
    },

    teacher: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
    },

    teacherText: {
        flex: 1,
        color: colors.text.secondary,
        fontFamily: fontFamily.regular,
        fontSize: textSize.body,
        lineHeight: 20,
    },

    badge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 999,
        backgroundColor: colors.background.error,
        boxShadow: shadows.input,
    },

    badgeUpToDate: {
        backgroundColor: colors.background.green,
    },

    badgeText: {
        color: colors.text.error,
        fontFamily: fontFamily.bold,
        fontSize: textSize.caption,
        lineHeight: 16,
        letterSpacing: 0.5,
    },

    badgeTextUpToDate: {
        color: colors.text.green,
    },

    divider: {
        height: 1,
        backgroundColor: colors.borderLight,
    },

    details: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        gap: 16,
        paddingTop: 4,
    },

    detail: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        maxWidth: "100%",
    },

    detailIcon: {
        width: 32,
        height: 32,
        borderRadius: 16,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.background.blue,
    },

    detailInfo: {
        flexShrink: 1,
    },

    detailLabel: {
        color: colors.text.secondary,
        fontFamily: fontFamily.medium,
        fontSize: textSize.caption,
        lineHeight: 16,
        letterSpacing: 0.5,
    },

    detailValue: {
        color: colors.text.primary,
        fontFamily: fontFamily.medium,
        fontSize: textSize.body,
        lineHeight: 20,
    },
});
