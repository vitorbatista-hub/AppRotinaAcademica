import { colors } from "@/styles/colors";
import { fontFamily } from "@/styles/fontFamily";
import { textSize } from "@/styles/fontSize";
import { shadows } from "@/styles/shadows";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        gap: 20,
        padding: 24,
        borderRadius: 12,
        overflow: "hidden",
        backgroundColor: colors.white,
        boxShadow: shadows.card,
    },

    accent: {
        position: "absolute",
        top: -40,
        right: -40,
        width: 128,
        height: 128,
        borderRadius: 64,
        backgroundColor: colors.background.info,
        opacity: 0.2,
    },

    icon: {
        width: 56,
        height: 56,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 28,
        backgroundColor: colors.info,
        boxShadow: shadows.input,
    },

    info: {
        flex: 1,
        gap: 2,
    },

    label: {
        color: colors.text.secondary,
        fontFamily: fontFamily.medium,
        fontSize: textSize.caption,
        lineHeight: 16,
        letterSpacing: 0.6,
        textTransform: "uppercase",
    },

    total: {
        color: colors.text.primary,
        fontFamily: fontFamily.bold,
        fontSize: textSize.title,
        lineHeight: 32,
        includeFontPadding: false,
    },
});
