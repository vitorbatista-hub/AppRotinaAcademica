import { Loading } from "@/components/Loading";
import { ActivitiesProvider } from "@/contexts/ActivitiesContext";
import { DisciplinesProvider } from "@/contexts/DisciplinesContext";
import { ExamsProvider } from "@/contexts/ExamsContext";
import { ProfileProvider } from "@/contexts/ProfileContext";
import { DATABASE_NAME, migrateDbIfNeeded } from "@/database";
import {
    Manrope_300Light,
    Manrope_400Regular,
    Manrope_500Medium,
    Manrope_600SemiBold,
    Manrope_700Bold,
    useFonts,
} from "@expo-google-fonts/manrope";
import { Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import { View } from "react-native";

export default function RootLayout() {
    const [fontsLoaded, fontError] = useFonts({
        Manrope_300Light,
        Manrope_400Regular,
        Manrope_500Medium,
        Manrope_600SemiBold,
        Manrope_700Bold,
    });

    // Se as fontes falharem, o app segue com a fonte do sistema em vez de travar no loading.
    if (!fontsLoaded && !fontError) {
        return (
            <View style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}>
                <Loading />
            </View>
        );
    }

    return (
        <SQLiteProvider databaseName={DATABASE_NAME} onInit={migrateDbIfNeeded}>
            <ProfileProvider>
                <ActivitiesProvider>
                    <DisciplinesProvider>
                        <ExamsProvider>
                            <Stack screenOptions={{
                                headerShown: false,
                            }}>
                                <Stack.Screen name="index" />
                                <Stack.Screen name="(tabs)" />
                                <Stack.Screen name="activity/[id]" />
                                <Stack.Screen name="activity/edit/[id]" />
                                <Stack.Screen name="discipline/new" />
                                <Stack.Screen name="discipline/[id]" />
                                <Stack.Screen name="discipline/edit/[id]" />
                                <Stack.Screen name="profile/edit" />
                                <Stack.Screen name="settings" />
                            </Stack>
                        </ExamsProvider>
                    </DisciplinesProvider>
                </ActivitiesProvider>
            </ProfileProvider>
        </SQLiteProvider>
    );
}
