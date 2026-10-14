import { colors } from "@/styles/colors";
import { fontFamily } from "@/styles/fontFamily";
import { textSize } from "@/styles/fontSize";
import { shadows } from "@/styles/shadows";
import { StyleSheet } from "react-native";

const AVATAR_SIZE = 144;

export const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.background.primary,
        flex: 1,
    },

    content: {
        gap: 48,
        paddingTop: 40,
        paddingBottom: 24,
        paddingHorizontal: 20,
    },

    profile: {
        alignItems: "center",
    },

    avatarContent: {
        width: AVATAR_SIZE,
        height: AVATAR_SIZE,
        borderRadius: AVATAR_SIZE / 2,
        boxShadow: shadows.avatar,
    },

    avatar: {
        width: AVATAR_SIZE,
        height: AVATAR_SIZE,
        borderRadius: AVATAR_SIZE / 2,
        borderWidth: 4,
        borderColor: colors.white,
    },

    editButton: {
        position: "absolute",
        right: 4,
        bottom: 4,
        width: 40,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 20,
        backgroundColor: colors.white,
        boxShadow: shadows.floating,
    },

    name: {
        marginTop: 24,
        color: colors.text.primary,
        fontFamily: fontFamily.bold,
        fontSize: textSize.title,
        lineHeight: 36,
        letterSpacing: -0.7,
        textAlign: "center",
    },

    course: {
        marginTop: 4,
        color: colors.text.secondary,
        fontFamily: fontFamily.regular,
        fontSize: textSize.subtitle,
        lineHeight: 24,
        textAlign: "center",
    },

    semester: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        marginTop: 12,
        paddingHorizontal: 16,
        paddingVertical: 6,
        borderRadius: 999,
        borderWidth: 1,
        borderColor: colors.borderLight,
        backgroundColor: colors.background.blue,
    },

    semesterText: {
        color: colors.text.primary,
        fontFamily: fontFamily.semiBold,
        fontSize: textSize.caption,
        lineHeight: 16,
        letterSpacing: 0.5,
    },

    settingsButton: {
        width: 260,
        marginTop: 32,
        boxShadow: shadows.primaryButton,
    },

    settingsText: {
        fontFamily: fontFamily.regular,
        fontSize: textSize.subtitle,
    },

    stats: {
        gap: 12,
    },

    statsRow: {
        flexDirection: "row",
        gap: 12,
    },
});
