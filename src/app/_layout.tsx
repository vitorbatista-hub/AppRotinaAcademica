import { Loading } from "@/components/Loading";
import {
    Manrope_300Light,
    Manrope_400Regular,
    Manrope_500Medium,
    Manrope_600SemiBold, Manrope_700Bold,
    useFonts
} from "@expo-google-fonts/manrope";
import { Stack } from "expo-router";
import { View } from "react-native";

export default function RootLayout() {
    const [fontsLoaded] = useFonts({
        Manrope_300Light,
        Manrope_400Regular,
        Manrope_500Medium,
        Manrope_600SemiBold,
        Manrope_700Bold,
    });

    if(!fontsLoaded) {
        return (
            <View style ={{
                flex : 1,
                justifyContent: "center",
                alignItems: "center"
                }}>

                <Loading/>
            </View>
        )
    }

    return (
        <Stack screenOptions={{
            headerShown: false,
        }}>
            <Stack.Screen name="index"/>
            <Stack.Screen name="(tabs)"/>
        </Stack>
    )
}