import { colors } from "@/styles/colors";
import { fontFamily } from "@/styles/fontFamily";
import { textSize } from "@/styles/fontSize";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        gap: 12,
        padding: 32,
        borderRadius: 12,
        borderWidth: 2,
        borderStyle: "dashed",
        borderColor: colors.border,
        backgroundColor: colors.background.dashed,
    },

    icon: {
        width: 48,
        height: 48,
        borderRadius: 24,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.info,
    },

    info: {
        alignItems: "center",
    },

    title: {
        color: colors.text.primary,
        fontFamily: fontFamily.semiBold,
        fontSize: textSize.section,
        lineHeight: 24,
    },

    subtitle: {
        color: colors.text.secondary,
        fontFamily: fontFamily.regular,
        fontSize: textSize.body,
        lineHeight: 20,
        textAlign: "center",
    },
});
