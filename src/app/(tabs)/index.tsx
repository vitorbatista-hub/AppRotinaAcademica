import { Platform, StyleSheet, Text, View } from "react-native";
import { styles } from "@/screens/index-style";
import { SummaryCard } from "@/components/SummaryCard";

export default function Index() {
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.label}>Minha Rotina</Text>
                <View style={styles.titleContent}>
                    <Text style={styles.title}>Olá, estudante!</Text>
                    <Text style={styles.subtitle}>Organize sua rotina acadêmica</Text>
                </View>
                
                <SummaryCard />
            </View>
        </View>
    );
}


