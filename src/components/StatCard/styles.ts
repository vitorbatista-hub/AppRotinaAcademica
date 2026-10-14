import { colors } from "@/styles/colors";
import { fontFamily } from "@/styles/fontFamily";
import { textSize } from "@/styles/fontSize";
import { shadows } from "@/styles/shadows";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        minHeight: 160,
        justifyContent: "space-between",
        gap: 16,
        padding: 24,
        borderRadius: 12,
        overflow: "hidden",
        backgroundColor: colors.white,
        boxShadow: shadows.card,
    },

    accent: {
        position: "absolute",
        top: -24,
        right: -24,
        width: 96,
        height: 96,
        borderRadius: 48,
        opacity: 0.4,
    },

    icon: {
        width: 40,
        height: 28,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 14,
    },

    info: {
        gap: 4,
    },

    total: {
        fontFamily: fontFamily.bold,
        fontSize: textSize.title,
        lineHeight: 32,
        includeFontPadding: false,
    },

    label: {
        color: colors.text.secondary,
        fontFamily: fontFamily.medium,
        fontSize: textSize.caption,
        lineHeight: 16,
        letterSpacing: 0.5,
    },
});
