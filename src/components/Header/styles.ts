import { colors } from "@/styles/colors";
import { fontFamily } from "@/styles/fontFamily";
import { textSize } from "@/styles/fontSize";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        height: 64,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        backgroundColor: colors.background.primary,
    },

    brand: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },

    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },

    title: {
        color: colors.primary,
        fontFamily: fontFamily.bold,
        fontSize: textSize.label,
        lineHeight: 28,
    },

    button: {
        padding: 8,
        borderRadius: 20,
    },

    badge: {
        position: "absolute",
        top: 8,
        right: 8,
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: colors.red,
    },
});
