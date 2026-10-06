import { colors } from "@/styles/colors";
import { fontFamily } from "@/styles/fontFamily";
import { textSize } from "@/styles/fontSize";
import { StyleSheet,Platform } from "react-native";


export const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.background.primary,
        flex: 1,
    },

    label: {
        fontSize: textSize.label,
        fontFamily: fontFamily.semiBold ,
        color: colors.primary,
    },

    content: {
        paddingTop: Platform.OS === "android" ? 54 : 64,
        paddingHorizontal: 24,
    },

    titleContent: {
        paddingTop: 28,
        marginBottom: 32,
    },

    title: {
        color: colors.text.primary,
        fontSize: textSize.title,
        fontFamily: fontFamily.semiBold,
    },
    
    subtitle: {
        fontSize: textSize.subtitle,
        fontFamily: fontFamily.regular,
        color: colors.text.secondary,
    },

});