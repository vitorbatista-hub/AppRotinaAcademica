import { colors } from "@/styles/colors";
import { fontFamily } from "@/styles/fontFamily";
import { textSize } from "@/styles/fontSize";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 54,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
    },

    text: {
        color: colors.white,
        fontSize: textSize.button,
        fontFamily: fontFamily.semiBold,
    },
})