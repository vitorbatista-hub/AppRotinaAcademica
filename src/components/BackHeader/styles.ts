import { colors } from "@/styles/colors";
import { fontFamily } from "@/styles/fontFamily";
import { textSize } from "@/styles/fontSize";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        height: 64,
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        paddingHorizontal: 12,
        borderBottomWidth: 1,
        borderBottomColor: colors.borderCard,
        backgroundColor: colors.background.primary,
    },

    button: {
        width: 40,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 20,
    },

    // Os dois botões têm a mesma largura, então o título fica no centro da tela.
    title: {
        flex: 1,
        fontFamily: fontFamily.bold,
        fontSize: textSize.label,
        lineHeight: 28,
        textAlign: "center",
    },
});
