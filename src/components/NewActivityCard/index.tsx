import { colors } from "@/styles/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Text, TouchableOpacity, TouchableOpacityProps, View } from "react-native";
import { styles } from "./styles";

export function NewActivityCard(props: TouchableOpacityProps) {
    return (
        <TouchableOpacity activeOpacity={0.7}
            style={styles.container}
            accessibilityRole="button"
            accessibilityLabel="Nova atividade"
            {...props}
        >
            <View style={styles.icon}>
                <Ionicons name="add" size={24} color={colors.text.light} />
            </View>

            <View style={styles.info}>
                <Text style={styles.title}>Nova Atividade</Text>
                <Text style={styles.subtitle}>Adicione mais tarefas à sua rotina</Text>
            </View>
        </TouchableOpacity>
    );
}
