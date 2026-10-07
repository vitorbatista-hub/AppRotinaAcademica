import { SummaryCard } from "@/components/SummaryCard";
import { styles } from "@/screens/index-style";
import { colors } from "@/styles/colors";
import { FontAwesome6, MaterialCommunityIcons } from "@expo/vector-icons";
import { Text, View } from "react-native";

export default function Index() {
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.label}>Minha Rotina</Text>
                <View style={styles.titleContent}>
                    <Text style={styles.title}>Olá, estudante!</Text>
                    <Text style={styles.subtitle}>Organize sua rotina acadêmica</Text>
                </View>
                
                <SummaryCard total={5}
                    title="Pendências"
                    subtitle="Para esta semana"
                    textColor={colors.orange}
                    icon={
                    <MaterialCommunityIcons name="clipboard-alert"
                        color={colors.orange}
                        size={26} />
                    }
                />

                <View style={styles.cardContent}>
                    <View style={styles.card}>
                        <SummaryCard total={2}
                            title="Provas"
                            subtitle="Próximos 15 dias"
                            textColor={colors.red}
                            icon={
                            <FontAwesome6 name="clipboard-question"
                                color={colors.red}
                                size={26} />
                            }
                        />

                    </View>

                    <View style={styles.card}>
                        <SummaryCard total={5}
                            title="Disciplinas"
                            subtitle="Ativas no semestre"
                            textColor={colors.primary}
                            icon={
                            <FontAwesome6 name="graduation-cap"
                                color={colors.primary}
                                size={26} />
                            }
                        />
                    </View>

                </View>

            </View>
        </View>
    );
}


