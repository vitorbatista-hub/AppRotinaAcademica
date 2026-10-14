import { colors } from "@/styles/colors";
import { fontFamily } from "@/styles/fontFamily";
import { textSize } from "@/styles/fontSize";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const TAB_ICON_SIZE = 24;
const TAB_BAR_HEIGHT = 64;

export default function TabLayout() {
    const insets = useSafeAreaInsets();

    return (
        <Tabs screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: colors.primary,
            tabBarInactiveTintColor: colors.text.secondary,
            tabBarLabelStyle: { fontFamily: fontFamily.medium, fontSize: textSize.caption },
            tabBarStyle: {
                height: TAB_BAR_HEIGHT + insets.bottom,
                paddingTop: 6,
                borderTopColor: colors.border,
            },
        }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: "Início",
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons size={TAB_ICON_SIZE} name={focused ? "home" : "home-outline"} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="discipline"
                options={{
                    title: "Disciplinas",
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons size={TAB_ICON_SIZE} name={focused ? "book" : "book-outline"} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="activity"
                options={{
                    title: "Atividades",
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons size={TAB_ICON_SIZE} name={focused ? "clipboard" : "clipboard-outline"} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="exam"
                options={{
                    title: "Provas",
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons size={TAB_ICON_SIZE} name={focused ? "school" : "school-outline"} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "Perfil",
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons size={TAB_ICON_SIZE} name={focused ? "person" : "person-outline"} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}
