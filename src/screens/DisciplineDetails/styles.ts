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

    heading: {
        flexDirection: "row",
        alignItems: "center",
        gap: 16,
    },

    icon: {
        width: 56,
        height: 56,
        borderRadius: 16,
        alignItems: "center",
        justifyContent: "center",
    },

    title: {
        flex: 1,
        color: colors.text.primary,
        fontSize: textSize.title,
        fontFamily: fontFamily.bold,
        lineHeight: 35,
    },

    infoCards: {
        gap: 12,
    },

    infoRow: {
        flexDirection: "row",
        gap: 12,
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

    sectionEmpty: {
        color: colors.text.secondary,
        fontFamily: fontFamily.regular,
        fontSize: textSize.body,
        lineHeight: 20,
    },

    empty: {
        padding: 20,
        color: colors.text.secondary,
        fontFamily: fontFamily.regular,
        fontSize: textSize.body,
        lineHeight: 20,
        textAlign: "center",
    },
});
