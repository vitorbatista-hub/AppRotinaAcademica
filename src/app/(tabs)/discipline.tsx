import { Button } from "@/components/Button";
import { colors } from "@/styles/colors";
import { View } from "react-native";


export default function Discipline() {
    return (
        <View style={{
            flex: 1,
            marginTop: 100,
            }}>
            
            <View style={{
                paddingHorizontal: 24,
            }}>
                <Button text="Salvar atividades"
                    color={colors.primary}
                    onPress={() => {}} />
            </View>
        </View>
    )
}