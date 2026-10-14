import { SQLiteDatabase } from "expo-sqlite";

const DATABASE_VERSION = 1;

export const DATABASE_NAME = "rotina.db";

// Roda toda vez que o app abre. As tabelas e os dados iniciais só são criados na primeira vez.
export async function migrateDbIfNeeded(db: SQLiteDatabase) {
    // O SQLite só valida chave estrangeira se isso for ligado a cada conexão.
    await db.execAsync("PRAGMA foreign_keys = ON;");

    //Pergunta pro banco qual é a versao dele.
    //await: espere isso terminar antes de continuar. 
    const row = await db.getFirstAsync<{ user_version: number }>("PRAGMA user_version");
    if (row && row.user_version >= DATABASE_VERSION) {
        return;
    }

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

        PRAGMA user_version = ${DATABASE_VERSION};
    `);
}
