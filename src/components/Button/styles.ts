import { colors } from "@/styles/colors";
import { fontFamily } from "@/styles/fontFamily";
import { textSize } from "@/styles/fontSize";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 48,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 8,
        borderRadius: 8,
    },

    outlined: {
        borderWidth: 2,
        borderColor: colors.border,
    },

    text: {
        color: colors.white,
        fontSize: textSize.button,
        fontFamily: fontFamily.semiBold,
        lineHeight: 24,
    },
});
