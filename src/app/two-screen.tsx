import { router } from "expo-router";
import { Button, StyleSheet, Text, View } from "react-native";


export default function TwoScreen() {
    return (
        <View>
            <Text style={styles.text}>Insira suas credenciais</Text>
            <Button
                title="Voltar para a tela anterior"
                onPress={() => {
                    router.back();
                }}
            />
        </View>

    )
}

const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        textAlign: "center",
        fontWeight: "700",
    },
});