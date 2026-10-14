import { ReactNode } from "react";
import { StyleProp, Text, TextStyle, TouchableOpacity, TouchableOpacityProps } from "react-native";
import { styles } from "./styles";

type ButtonProps = TouchableOpacityProps & {
    text: string;
    color: string;
    icon?: ReactNode;
    variant?: "filled" | "outlined";
    textStyle?: StyleProp<TextStyle>;
};

export function Button({ text, color, icon, variant = "filled", textStyle, style, ...rest }: ButtonProps) {
    const isOutlined = variant === "outlined";

    return (
        <TouchableOpacity activeOpacity={0.7}
            style={[styles.container, isOutlined ? styles.outlined : { backgroundColor: color }, style]}
            accessibilityRole="button"
            {...rest}
        >
            {icon}
            <Text style={[styles.text, isOutlined && { color }, textStyle]}>{text}</Text>
        </TouchableOpacity>
    );
}
