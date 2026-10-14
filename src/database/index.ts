import { SQLiteDatabase } from "expo-sqlite";

const DATABASE_VERSION = 3;

export const DATABASE_NAME = "rotina.db";

// Roda toda vez que o app abre. Cada versão só é aplicada uma vez, na ordem,
// então quem já tinha o banco v1 recebe apenas as mudanças da v2.
export async function migrateDbIfNeeded(db: SQLiteDatabase) {
    // O SQLite só valida chave estrangeira se isso for ligado a cada conexão.
    await db.execAsync("PRAGMA foreign_keys = ON;");

    //Pergunta pro banco qual é a versao dele.
    //await: espere isso terminar antes de continuar.
    const row = await db.getFirstAsync<{ user_version: number }>("PRAGMA user_version");
    let currentVersion = row?.user_version ?? 0;

    if (currentVersion >= DATABASE_VERSION) {
        return;
    }

    // v1: disciplinas e atividades.
    if (currentVersion === 0) {
        await db.execAsync(`
            CREATE TABLE disciplines (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                teacher TEXT NOT NULL,
                schedule TEXT NOT NULL,
                room TEXT NOT NULL,
                color TEXT NOT NULL,
                icon TEXT NOT NULL
            );

            CREATE TABLE activities (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                description TEXT NOT NULL DEFAULT '',
                discipline_id INTEGER NOT NULL REFERENCES disciplines(id),
                due_date TEXT NOT NULL,
                status TEXT NOT NULL CHECK (status IN ('urgent', 'upcoming', 'inProgress', 'done')),
                priority TEXT NOT NULL CHECK (priority IN ('low', 'medium', 'high'))
            );

            INSERT INTO disciplines (id, name, teacher, schedule, room, color, icon) VALUES
                (1, 'Engenharia de Software', 'Prof. Carlos Almeida', 'Seg, Qua 08:00 - 10:00', 'Sala 302, Bloco C', '#004AC6', 'code-slash'),
                (2, 'Banco de Dados', 'Profa. Marina Silva', 'Ter, Qui 10:00 - 12:00', 'Lab 4, Bloco B', '#006E2F', 'server'),
                (3, 'Sistemas Operacionais', 'Prof. Roberto Silva', 'Seg, Qua 10:00 - 12:00', 'Laboratório 401', '#004AC6', 'hardware-chip'),
                (4, 'Probabilidade e Estatística', 'Profa. Maria Costa', 'Ter, Qui 08:00 - 10:00', 'Sala 205', '#004AC6', 'stats-chart'),
                (5, 'Psicologia Aplicada', 'Prof. Carlos Lima', 'Sex 14:00 - 16:00', 'Auditório 112', '#006E2F', 'people');

            INSERT INTO activities (title, description, discipline_id, due_date, status, priority) VALUES
                ('Seminário de ética', 'Preparar slides e roteiro para a apresentação final sobre Ética Profissional.', 1, date('now', 'localtime'), 'urgent', 'high'),
                ('Exercícios de probabilidade', 'Lista 4 - Distribuição Normal e Teorema do Limite Central. Entregar em PDF.', 4, date('now', 'localtime', '+1 day'), 'upcoming', 'medium'),
                ('Modelagem do banco de dados', 'Criar o diagrama entidade-relacionamento e o script das tabelas do projeto.', 2, date('now', 'localtime', '+3 days'), 'inProgress', 'medium'),
                ('Projeto mobile', 'Implementação da interface principal e integração com API REST.', 1, date('now', 'localtime', '-1 day'), 'done', 'low');

            PRAGMA user_version = 1;
        `);
        currentVersion = 1;
    }

    // v2: provas. As duas de exemplo substituem o "2" que antes ficava fixo na Home.
    if (currentVersion === 1) {
        await db.execAsync(`
            CREATE TABLE exams (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                discipline_id INTEGER NOT NULL REFERENCES disciplines(id),
                date TEXT NOT NULL,
                notes TEXT NOT NULL DEFAULT ''
            );

            INSERT INTO exams (title, discipline_id, date, notes)
            SELECT 'Prova 1', id, date('now', 'localtime', '+5 days'), 'Normalização, SQL e modelagem entidade-relacionamento.'
            FROM disciplines WHERE id = 2;

            INSERT INTO exams (title, discipline_id, date, notes)
            SELECT 'Avaliação parcial', id, date('now', 'localtime', '+12 days'), 'Distribuições de probabilidade e intervalos de confiança.'
            FROM disciplines WHERE id = 4;

            PRAGMA user_version = 2;
        `);
        currentVersion = 2;
    }

    // v3: perfil do estudante, que antes ficava fixo em src/data/profile.ts.
    // Só existe uma linha (id 1); avatar_uri vazio significa usar a foto padrão.
    if (currentVersion === 2) {
        await db.execAsync(`
            CREATE TABLE profile (
                id INTEGER PRIMARY KEY CHECK (id = 1),
                name TEXT NOT NULL,
                course TEXT NOT NULL,
                semester TEXT NOT NULL,
                avatar_uri TEXT NOT NULL DEFAULT ''
            );

            INSERT INTO profile (id, name, course, semester) VALUES
                (1, 'Estudante Universitário', 'Sistemas de Informação', '2º/2026');

            PRAGMA user_version = 3;
        `);
    }
}
