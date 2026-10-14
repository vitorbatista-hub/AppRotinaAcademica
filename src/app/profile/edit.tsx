import { BackHeader } from "@/components/BackHeader";
import { ProfileForm } from "@/components/ProfileForm";
import { useProfile } from "@/contexts/ProfileContext";
import { ProfileInput } from "@/data/profile";
import { styles } from "@/screens/NewActivity/styles";
import { colors } from "@/styles/colors";
import { router } from "expo-router";
import { ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function EditProfile() {
    const { profile, updateProfile } = useProfile();

    async function handleSubmit(values: ProfileInput) {
        await updateProfile(values);
        router.back();
    }

    return (
        <SafeAreaView style={styles.container} edges={["top"]}>
            <BackHeader title="Minha Rotina"
                color={colors.primary}
                actionIcon="notifications-outline"
                actionLabel="Notificações"
                onActionPress={() => router.push("/notifications")}
            />

            <ScrollView contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
                automaticallyAdjustKeyboardInsets
            >
                <Text style={styles.title}>Editar Perfil</Text>

                <ProfileForm initialValues={{
                    name: profile.name,
                    course: profile.course,
                    semester: profile.semester,
                }}
                    onSubmit={handleSubmit}
                />
            </ScrollView>
        </SafeAreaView>
    );
}
