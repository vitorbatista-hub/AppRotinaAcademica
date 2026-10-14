import { ExamCard } from "@/components/ExamCard";
import { Header } from "@/components/Header";
import { NewActivityCard } from "@/components/NewActivityCard";
import { isUpcomingExam, useExams } from "@/contexts/ExamsContext";
import { Exam } from "@/data/exams";
import { summary } from "@/data/summary";
import { styles } from "@/screens/Exams/styles";
import { router } from "expo-router";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Exams() {
    const { exams } = useExams();

    const upcomingExams = exams.filter((exam) => isUpcomingExam(exam));
    // A mais recente primeiro, já que a lista do banco vem da mais antiga para a mais nova.
    const pastExams = exams.filter((exam) => !isUpcomingExam(exam)).reverse();

    function openExam(exam: Exam) {
        router.push({ pathname: "/exam/edit/[id]", params: { id: exam.id } });
    }

    return (
        <SafeAreaView style={styles.container} edges={["top"]}>
            <Header hasNotifications={summary.hasNotifications} />

            <ScrollView contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.titleContent}>
                    <Text style={styles.title}>Calendário de Provas</Text>
                    <Text style={styles.subtitle}>Toque em uma prova para editar ou excluir.</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Próximas</Text>

                    {upcomingExams.map((exam) => (
                        <ExamCard key={exam.id} exam={exam} onPress={() => openExam(exam)} />
                    ))}

                    {upcomingExams.length === 0 && (
                        <Text style={styles.empty}>Nenhuma prova marcada.</Text>
                    )}
                </View>

                {pastExams.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Realizadas</Text>

                        {pastExams.map((exam) => (
                            <ExamCard key={exam.id} exam={exam} onPress={() => openExam(exam)} />
                        ))}
                    </View>
                )}

                <NewActivityCard title="Nova Prova"
                    subtitle="Registre a data e o conteúdo da avaliação"
                    onPress={() => router.push("/exam/new")}
                />
            </ScrollView>
        </SafeAreaView>
    );
}
