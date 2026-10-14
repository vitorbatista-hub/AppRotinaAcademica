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
        gap: 12,
    },

    title: {
        color: colors.text.primary,
        fontSize: textSize.title,
        fontFamily: fontFamily.bold,
        lineHeight: 36,
    },

    disciplines: {
        gap: 16,
    },

    empty: {
        color: colors.text.secondary,
        fontFamily: fontFamily.regular,
        fontSize: textSize.body,
        lineHeight: 20,
        textAlign: "center",
    },
});
