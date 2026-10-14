import { colors } from "@/styles/colors";
import { fontFamily } from "@/styles/fontFamily";
import { textSize } from "@/styles/fontSize";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        gap: 8,
    },

    label: {
        color: colors.text.primary,
        fontFamily: fontFamily.medium,
        fontSize: textSize.caption,
        lineHeight: 16,
        letterSpacing: 0.5,
    },

    error: {
        color: colors.red,
        fontFamily: fontFamily.regular,
        fontSize: textSize.caption,
        lineHeight: 16,
    },
});
