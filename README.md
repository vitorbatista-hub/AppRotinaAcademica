# App de Rotina Acadêmica 📚

**Rotina Acadêmica** é um aplicativo mobile desenvolvido com React Native e Expo como trabalho acadêmico da disciplina **"Tópicos Especiais em Sistemas de Informação"**, do curso de Sistemas de Informação.

O objetivo do projeto é colocar em prática conceitos de desenvolvimento mobile — construção de telas, estilização e navegação entre telas — criando um aplicativo que ajude estudantes a organizar sua rotina acadêmica.

## Status atual

O projeto está sendo desenvolvido de forma incremental, acompanhando as aulas da disciplina. Atualmente ele conta com quatro abas e uma tela de detalhes:

- **Início** (`src/app/(tabs)/index.tsx`): resumo do dia, próximas atividades e disciplinas.
- **Disciplinas** (`src/app/(tabs)/discipline.tsx`): lista das disciplinas com busca.
- **Atividades** (`src/app/(tabs)/activity/index.tsx`): lista das atividades com filtro por status.
- **Nova atividade** (`src/app/(tabs)/activity/new.tsx`): formulário de cadastro de atividade.
- **Detalhes da atividade** (`src/app/activity/[id].tsx`): dados da atividade e botão para concluí-la.
- **Perfil** (`src/app/(tabs)/profile.tsx`): dados do estudante e estatísticas.

As disciplinas e as atividades ficam salvas em um banco SQLite local, criado e preenchido com dados iniciais na primeira vez que o app abre. Os dados do perfil, a contagem de provas e as notificações ainda são fixos.

## Tecnologias

- [React Native](https://reactnative.dev/) — desenvolvimento mobile multiplataforma
- [Expo](https://expo.dev/) (SDK 57) — plataforma e ferramentas de desenvolvimento
- [Expo Router](https://docs.expo.dev/router/introduction/) — roteamento baseado em arquivos e navegação
- [Expo SQLite](https://docs.expo.dev/versions/v57.0.0/sdk/sqlite/) — banco de dados local
- [TypeScript](https://www.typescriptlang.org/) — tipagem estática
- [Visual Studio Code](https://code.visualstudio.com/) — editor de código

## Estrutura do projeto

```
src/
├── app/                  # Rotas (Expo Router)
│   ├── _layout.tsx       # Layout raiz: fontes, banco, contexts e navegação em pilha
│   ├── index.tsx         # Redireciona para as abas
│   ├── (tabs)/           # Abas: Início, Disciplinas, Atividades e Perfil
│   └── activity/[id].tsx # Detalhes de uma atividade
├── components/           # Componentes reutilizáveis (index.tsx + styles.ts)
├── contexts/             # Estado global de atividades e disciplinas
├── data/                 # Tipos e dados fixos (perfil e resumo)
├── database/             # Criação das tabelas e dados iniciais do SQLite
├── screens/              # Estilos de cada tela
├── styles/               # Cores, fontes, tamanhos e sombras
└── utils/                # Funções de data
```

## Como executar

### Pré-requisitos

- [Node.js](https://nodejs.org/) (versão LTS)
- [Expo Go](https://expo.dev/go) no celular, ou um emulador Android / simulador iOS

### Rodando o projeto

1. Instale as dependências

   ```bash
   npm install
   ```

2. Inicie o servidor de desenvolvimento

   ```bash
   npx expo start
   ```

3. Escaneie o QR code com o Expo Go (Android) ou com a câmera (iOS), ou pressione `a` / `i` / `w` no terminal para abrir no Android, iOS ou navegador.

### Scripts disponíveis

| Comando           | Descrição                                   |
| ----------------- | ------------------------------------------- |
| `npm start`       | Inicia o servidor de desenvolvimento do Expo |
| `npm run android` | Abre o app no Android                       |
| `npm run ios`     | Abre o app no iOS                           |
| `npm run web`     | Abre o app no navegador                     |
| `npm run lint`    | Executa o linter                            |

## Autor

Desenvolvido por **Vitor Batista** como parte da disciplina *Tópicos Especiais em Sistemas de Informação*.
