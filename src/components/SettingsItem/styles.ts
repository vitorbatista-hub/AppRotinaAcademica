import { colors } from "@/styles/colors";
import { fontFamily } from "@/styles/fontFamily";
import { textSize } from "@/styles/fontSize";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        minHeight: 56,
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        paddingHorizontal: 16,
        paddingVertical: 12,
    },

    icon: {
        width: 36,
        height: 36,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        backgroundColor: colors.background.blue,
    },

    label: {
        flex: 1,
        fontFamily: fontFamily.medium,
        fontSize: textSize.subtitle,
        lineHeight: 24,
    },

    value: {
        color: colors.text.secondary,
        fontFamily: fontFamily.regular,
        fontSize: textSize.body,
        lineHeight: 20,
    },
});
