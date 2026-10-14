import { colors } from "@/styles/colors";
import { fontFamily } from "@/styles/fontFamily";
import { textSize } from "@/styles/fontSize";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        height: 38,
        justifyContent: "center",
        paddingHorizontal: 20,
        borderRadius: 999,
        borderWidth: 1,
        borderColor: colors.border,
    },

    containerSelected: {
        borderColor: colors.info,
        backgroundColor: colors.info,
    },

    text: {
        color: colors.text.secondary,
        fontFamily: fontFamily.medium,
        fontSize: textSize.caption,
        lineHeight: 16,
        letterSpacing: 0.5,
    },

    textSelected: {
        color: colors.text.light,
    },
});
