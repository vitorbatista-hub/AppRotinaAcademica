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
        paddingBottom: 24,
        paddingHorizontal: 20,
    },

    titleContent: {
        gap: 4,
    },

    title: {
        color: colors.text.primary,
        fontSize: textSize.title,
        fontFamily: fontFamily.bold,
        lineHeight: 36,
    },

    subtitle: {
        fontSize: textSize.subtitle,
        fontFamily: fontFamily.regular,
        color: colors.text.secondary,
        lineHeight: 24,
    },

    summary: {
        gap: 16,
    },

    cardContent: {
        flexDirection: "row",
        gap: 16,
    },

    card: {
        flex: 1,
    },

    section: {
        gap: 12,
    },

    sectionHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    sectionTitle: {
        color: colors.text.primary,
        fontFamily: fontFamily.semiBold,
        fontSize: textSize.section,
        lineHeight: 24,
    },

    sectionLink: {
        color: colors.primary,
        fontFamily: fontFamily.medium,
        fontSize: textSize.caption,
        lineHeight: 16,
        letterSpacing: 0.5,
    },

    disciplines: {
        gap: 16,
    },
});
