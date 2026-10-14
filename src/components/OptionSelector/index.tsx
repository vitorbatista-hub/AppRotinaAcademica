import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";

type Option<T> = {
    label: string;
    value: T;
    color?: string;
    backgroundColor?: string;
};

type OptionSelectorProps<T> = {
    options: Option<T>[];
    value: T;
    onChange: (value: T) => void;
};

export function OptionSelector<T extends string>({ options, value, onChange }: OptionSelectorProps<T>) {
    return (
        <View style={styles.container}>
            {options.map((option) => {
                const isSelected = option.value === value;

                return (
                    <TouchableOpacity key={option.value}
                        activeOpacity={0.7}
                        style={[
                            styles.option,
                            isSelected && styles.optionSelected,
                            isSelected && option.color !== undefined && { borderColor: option.color },
                            isSelected && option.backgroundColor !== undefined && { backgroundColor: option.backgroundColor },
                        ]}
                        onPress={() => onChange(option.value)}
                        accessibilityRole="button"
                        accessibilityState={{ selected: isSelected }}
                    >
                        <Text
                            style={[
                                styles.text,
                                isSelected && styles.textSelected,
                                isSelected && option.color !== undefined && { color: option.color },
                            ]}
                        >
                            {option.label}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}
