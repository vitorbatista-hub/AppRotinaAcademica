import { DisciplineCard } from "@/components/DisciplineCard";
import { Header } from "@/components/Header";
import { NewActivityCard } from "@/components/NewActivityCard";
import { SearchInput } from "@/components/SearchInput";
import { useDisciplines } from "@/contexts/DisciplinesContext";
import { summary } from "@/data/summary";
import { styles } from "@/screens/Discipline/styles";
import { router } from "expo-router";
import { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Tira acentos e maiúsculas para "estatistica" encontrar "Estatística".
function normalize(text: string) {
    return text.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}

export default function Discipline() {
    const { disciplines } = useDisciplines();
    const [search, setSearch] = useState("");

    const term = normalize(search.trim());
    const filteredDisciplines = disciplines.filter((discipline) =>
        [discipline.name, discipline.teacher, discipline.room]
            .some((field) => normalize(field).includes(term))
    );

    return (
        <SafeAreaView style={styles.container} edges={["top"]}>
            <Header hasNotifications={summary.hasNotifications} />

            <ScrollView contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                <View style={styles.titleContent}>
                    <Text style={styles.title}>Minhas Disciplinas</Text>
                    <SearchInput value={search}
                        onChangeText={setSearch}
                        placeholder="Buscar disciplina, professor ou sala..."
                        accessibilityLabel="Buscar disciplina, professor ou sala"
                    />
                </View>

                <View style={styles.disciplines}>
                    {filteredDisciplines.map((discipline) => (
                        <DisciplineCard key={discipline.id}
                            discipline={discipline}
                            onPress={() => router.push({
                                pathname: "/discipline/[id]",
                                params: { id: discipline.id },
                            })}
                        />
                    ))}

                    {filteredDisciplines.length === 0 && (
                        <Text style={styles.empty}>Nenhuma disciplina encontrada.</Text>
                    )}
                </View>

                <NewActivityCard title="Nova Disciplina"
                    subtitle="Cadastre uma matéria do semestre"
                    onPress={() => router.push("/discipline/new")}
                />
            </ScrollView>
        </SafeAreaView>
    );
}
