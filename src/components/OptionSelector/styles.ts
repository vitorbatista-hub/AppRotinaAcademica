import { colors } from "@/styles/colors";
import { fontFamily } from "@/styles/fontFamily";
import { textSize } from "@/styles/fontSize";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        gap: 12,
    },

    option: {
        flex: 1,
        height: 48,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.border,
        backgroundColor: colors.white,
    },

    optionSelected: {
        borderColor: colors.orangeDark,
        backgroundColor: colors.background.orange,
    },

    text: {
        color: colors.text.secondary,
        fontFamily: fontFamily.regular,
        fontSize: textSize.body,
        lineHeight: 20,
    },

    textSelected: {
        color: colors.orangeDark,
        fontFamily: fontFamily.bold,
    },
});
