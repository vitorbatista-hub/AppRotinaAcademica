import { Stack } from "expo-router";

export default function ExamLayout() {
    return (
        <Stack screenOptions={{
            headerShown: false,
        }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="new" />
            <Stack.Screen name="edit/[id]" />
        </Stack>
    );
}
