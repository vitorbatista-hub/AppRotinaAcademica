import { colors } from "@/styles/colors";
import { fontFamily } from "@/styles/fontFamily";
import { textSize } from "@/styles/fontSize";
import { shadows } from "@/styles/shadows";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        gap: 16,
        padding: 24,
        borderRadius: 12,
        backgroundColor: colors.info,
        boxShadow: shadows.card,
    },

    info: {
        flex: 1,
        gap: 4,
    },

    title: {
        color: colors.text.light,
        fontFamily: fontFamily.semiBold,
        fontSize: textSize.section,
        lineHeight: 24,
    },

    text: {
        color: colors.text.light,
        fontFamily: fontFamily.regular,
        fontSize: textSize.body,
        lineHeight: 20,
        opacity: 0.9,
    },
});
