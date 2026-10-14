import { colors } from "@/styles/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Text, View } from "react-native";
import { styles } from "./styles";

type TipCardProps = {
    title: string;
    text: string;
};

export function TipCard({ title, text }: TipCardProps) {
    return (
        <View style={styles.container}>
            <Ionicons name="bulb" size={22} color={colors.text.tip} />

            <View style={styles.info}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.text}>{text}</Text>
            </View>
        </View>
    );
}
