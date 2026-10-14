import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";
import { styles } from "./styles";

type FilterChipProps = TouchableOpacityProps & {
    label: string;
    selected?: boolean;
};

export function FilterChip({ label, selected = false, ...rest }: FilterChipProps) {
    return (
        <TouchableOpacity activeOpacity={0.7}
            style={[styles.container, selected && styles.containerSelected]}
            accessibilityRole="button"
            accessibilityState={{ selected }}
            {...rest}
        >
            <Text style={[styles.text, selected && styles.textSelected]}>{label}</Text>
        </TouchableOpacity>
    );
}
