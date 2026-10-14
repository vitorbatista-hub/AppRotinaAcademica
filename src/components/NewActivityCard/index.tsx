import { colors } from "@/styles/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Text, TouchableOpacity, TouchableOpacityProps, View } from "react-native";
import { styles } from "./styles";

type NewActivityCardProps = TouchableOpacityProps & {
    // Também usado para nova disciplina e nova prova, trocando só os textos.
    title?: string;
    subtitle?: string;
};

export function NewActivityCard({
    title = "Nova Atividade",
    subtitle = "Adicione mais tarefas à sua rotina",
    ...props
}: NewActivityCardProps) {
    return (
        <TouchableOpacity activeOpacity={0.7}
            style={styles.container}
            accessibilityRole="button"
            accessibilityLabel={title}
            {...props}
        >
            <View style={styles.icon}>
                <Ionicons name="add" size={24} color={colors.text.light} />
            </View>

            <View style={styles.info}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.subtitle}>{subtitle}</Text>
            </View>
        </TouchableOpacity>
    );
}
