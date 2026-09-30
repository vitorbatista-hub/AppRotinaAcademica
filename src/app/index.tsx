import { router } from "expo-router";
import { Button, Platform, StyleSheet, Text, View } from "react-native";

import { fontFamily } from "@/styles/fontFamily"

export default function Index() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Hello, World!</Text>
            <Text style={styles.subtitle}>Faculdade de Sistemas de Informação</Text>
            <Button
                title="Fazer login"
                onPress={() => {
                    router.push("/two-screen");
                }}
            />
        
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ffffff",
        flex: 1,
        alignItems: "center",
        marginTop: Platform.OS === "android" ? 42 : 0,
    },

    title: {
        fontSize: 20,
        fontFamily: fontFamily.semiBold ,
        color: "#050505",
    },
    
    subtitle: {
        fontSize: 16,
        fontFamily: fontFamily.regular,
        color: "#353636",
    },

});
