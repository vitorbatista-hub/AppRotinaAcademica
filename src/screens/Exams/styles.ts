import { colors } from "@/styles/colors";
import { fontFamily } from "@/styles/fontFamily";
import { textSize } from "@/styles/fontSize";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.background.primary,
        flex: 1,
    },

    content: {
        gap: 32,
        paddingTop: 16,
        paddingBottom: 32,
        paddingHorizontal: 20,
    },

    titleContent: {
        gap: 8,
    },

    title: {
        color: colors.text.primary,
        fontSize: textSize.title,
        fontFamily: fontFamily.bold,
        lineHeight: 36,
    },

    subtitle: {
        color: colors.text.secondary,
        fontFamily: fontFamily.regular,
        fontSize: textSize.body,
        lineHeight: 20,
    },

    section: {
        gap: 12,
    },

    sectionTitle: {
        color: colors.text.primary,
        fontFamily: fontFamily.semiBold,
        fontSize: textSize.section,
        lineHeight: 24,
    },

    empty: {
        color: colors.text.secondary,
        fontFamily: fontFamily.regular,
        fontSize: textSize.body,
        lineHeight: 20,
    },
});
