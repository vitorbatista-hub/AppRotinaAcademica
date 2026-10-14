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

    containerError: {
        borderColor: colors.red,
    },

    value: {
        flex: 1,
        color: colors.text.primary,
        fontFamily: fontFamily.regular,
        fontSize: textSize.body,
        lineHeight: 20,
    },

    overlay: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: colors.background.overlay,
    },

    sheet: {
        maxHeight: "70%",
        paddingTop: 24,
        paddingHorizontal: 20,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        backgroundColor: colors.white,
    },

    sheetTitle: {
        paddingBottom: 8,
        color: colors.text.primary,
        fontFamily: fontFamily.semiBold,
        fontSize: textSize.section,
        lineHeight: 24,
    },

    option: {
        minHeight: 48,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12,
        borderBottomWidth: 1,
        borderBottomColor: colors.borderCard,
    },

    optionText: {
        flex: 1,
        color: colors.text.secondary,
        fontFamily: fontFamily.regular,
        fontSize: textSize.body,
        lineHeight: 20,
    },

    optionTextSelected: {
        color: colors.primary,
        fontFamily: fontFamily.semiBold,
    },
});
