import { colors } from "@/styles/colors";
import { fontFamily } from "@/styles/fontFamily";
import { textSize } from "@/styles/fontSize";
import { shadows } from "@/styles/shadows";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        minHeight: 128,
        justifyContent: "space-between",
        padding: 24,
        borderRadius: 12,
        overflow: "hidden",
        backgroundColor: colors.white,
        boxShadow: shadows.card,
    },

    accent: {
        position: "absolute",
        top: -16,
        right: -16,
        width: 96,
        height: 96,
        borderBottomLeftRadius: 96,
    },

    row: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },

    textRow: {
        fontFamily: fontFamily.bold,
        fontSize: textSize.button,
        lineHeight: 24,
        includeFontPadding: false,
    },

    content: {
        paddingTop: 12,
    },

    titleContent: {
        color: colors.text.primary,
        fontFamily: fontFamily.semiBold,
        fontSize: textSize.dashboard.title,
        lineHeight: 24,
    },

    subtitle: {
        color: colors.text.secondary,
        fontFamily: fontFamily.regular,
        fontSize: textSize.dashboard.subtitle,
        lineHeight: 20,
    },
});
