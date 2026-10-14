import { Button } from "@/components/Button";
import { Header } from "@/components/Header";
import { StatCard } from "@/components/StatCard";
import { StatHighlightCard } from "@/components/StatHighlightCard";
import { useActivities } from "@/contexts/ActivitiesContext";
import { useDisciplines } from "@/contexts/DisciplinesContext";
import { profile } from "@/data/profile";
import { summary } from "@/data/summary";
import { styles } from "@/screens/Profile/styles";
import { colors } from "@/styles/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Profile() {
    const { pendingCount, completedCount } = useActivities();
    const { disciplines } = useDisciplines();

    return (
        <SafeAreaView style={styles.container} edges={["top"]}>
            <Header hasNotifications={summary.hasNotifications} />

            <ScrollView contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.profile}>
                    <View style={styles.avatarContent}>
                        <Image source={require("@/assets/images/avatar-large.jpg")}
                            style={styles.avatar}
                            accessibilityLabel="Foto de perfil do estudante"
                        />
                        <TouchableOpacity activeOpacity={0.7}
                            style={styles.editButton}
                            accessibilityRole="button"
                            accessibilityLabel="Editar foto de perfil"
                        >
                            <Ionicons name="camera" size={18} color={colors.primary} />
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.name}>{profile.name}</Text>
                    <Text style={styles.course}>{profile.course}</Text>

                    <View style={styles.semester}>
                        <Ionicons name="calendar" size={14} color={colors.primary} />
                        <Text style={styles.semesterText}>{profile.semester}</Text>
                    </View>

                    <Button text="Configurações"
                        color={colors.primary}
                        icon={<Ionicons name="settings-outline" size={18} color={colors.white} />}
                        textStyle={styles.settingsText}
                        style={styles.settingsButton}
                    />
                </View>

                <View style={styles.stats}>
                    <StatHighlightCard total={disciplines.length}
                        label="Disciplinas ativas"
                        icon="school"
                        onPress={() => router.push("/discipline")}
                    />

                    <View style={styles.statsRow}>
                        <StatCard total={completedCount}
                            label={"Atividades\nConcluídas"}
                            icon="checkmark-done"
                            iconColor={colors.text.green}
                            iconBackground={colors.background.green}
                        />
                        <StatCard total={pendingCount}
                            label={"Pendências\nAtuais"}
                            icon="alert-circle"
                            iconColor={colors.text.error}
                            iconBackground={colors.background.error}
                            totalColor={colors.red}
                            accentColor={colors.background.error}
                        />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
