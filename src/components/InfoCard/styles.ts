import { colors } from "@/styles/colors";
import { fontFamily } from "@/styles/fontFamily";
import { textSize } from "@/styles/fontSize";
import { shadows } from "@/styles/shadows";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 8,
        padding: 24,
        borderRadius: 12,
        backgroundColor: colors.white,
        boxShadow: shadows.card,
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },

    label: {
        flex: 1,
        color: colors.text.secondary,
        fontFamily: fontFamily.medium,
        fontSize: textSize.caption,
        lineHeight: 16,
        letterSpacing: 0.6,
        textTransform: "uppercase",
    },

    value: {
        fontFamily: fontFamily.semiBold,
        fontSize: textSize.section,
        lineHeight: 24,
    },
});
