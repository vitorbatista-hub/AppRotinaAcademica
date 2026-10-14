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
        borderLeftWidth: 4,
        backgroundColor: colors.white,
        boxShadow: shadows.card,
    },

    header: {
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: 12,
    },

    name: {
        flex: 1,
        color: colors.text.primary,
        fontFamily: fontFamily.semiBold,
        fontSize: textSize.section,
        lineHeight: 24,
    },

    rows: {
        gap: 8,
    },

    row: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },

    rowText: {
        flex: 1,
        color: colors.text.secondary,
        fontFamily: fontFamily.regular,
        fontSize: textSize.body,
        lineHeight: 20,
    },
});
