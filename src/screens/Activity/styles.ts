import { colors } from "@/styles/colors";
import { fontFamily } from "@/styles/fontFamily";
import { textSize } from "@/styles/fontSize";
import { StyleSheet } from "react-native";

const HORIZONTAL_PADDING = 20;

export const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.background.primary,
        flex: 1,
    },

    content: {
        gap: 24,
        paddingTop: 16,
        paddingBottom: 24,
        paddingHorizontal: HORIZONTAL_PADDING,
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

    // A margem negativa faz a fileira de filtros rolar até as bordas da tela.
    filters: {
        flexGrow: 0,
        marginHorizontal: -HORIZONTAL_PADDING,
    },

    filtersContent: {
        gap: 12,
        paddingHorizontal: HORIZONTAL_PADDING,
    },

    activities: {
        gap: 16,
        paddingTop: 8,
    },

    empty: {
        color: colors.text.secondary,
        fontFamily: fontFamily.regular,
        fontSize: textSize.body,
        lineHeight: 20,
        textAlign: "center",
    },

    newActivity: {
        paddingTop: 16,
    },
});
