import { colors } from "@/styles/colors";
import { fontFamily } from "@/styles/fontFamily";
import { textSize } from "@/styles/fontSize";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        height: 48,
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.border,
        backgroundColor: colors.white,
    },

    containerMultiline: {
        height: 114,
        alignItems: "flex-start",
        paddingVertical: 12,
    },

    containerError: {
        borderColor: colors.red,
    },

    input: {
        flex: 1,
        height: "100%",
        padding: 0,
        color: colors.text.primary,
        fontFamily: fontFamily.regular,
        fontSize: textSize.body,
    },

    inputMultiline: {
        lineHeight: 20,
        textAlignVertical: "top",
    },
});
