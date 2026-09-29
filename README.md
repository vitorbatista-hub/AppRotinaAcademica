# Rotina Acadêmica 📚

**Rotina Acadêmica** é um aplicativo mobile desenvolvido com React Native e Expo como trabalho acadêmico da disciplina **"Tópicos Especiais em Sistemas de Informação"**, do curso de Sistemas de Informação.

O objetivo do projeto é colocar em prática conceitos de desenvolvimento mobile — construção de telas, estilização e navegação entre telas — criando um aplicativo que ajude estudantes a organizar sua rotina acadêmica.

## Status atual

O projeto está sendo desenvolvido de forma incremental, acompanhando as aulas da disciplina. Atualmente ele conta com:

- **Tela inicial** (`src/app/index.tsx`): tela de boas-vindas com botão de login.
- **Tela de credenciais** (`src/app/two-screen.tsx`): tela para inserir as credenciais, com botão para voltar.
- **Navegação em pilha** (`src/app/_layout.tsx`): navegação entre as telas usando o Expo Router.

## Tecnologias

- [React Native](https://reactnative.dev/) — desenvolvimento mobile multiplataforma
- [Expo](https://expo.dev/) (SDK 57) — plataforma e ferramentas de desenvolvimento
- [Expo Router](https://docs.expo.dev/router/introduction/) — roteamento baseado em arquivos e navegação
- [TypeScript](https://www.typescriptlang.org/) — tipagem estática
- [Visual Studio Code](https://code.visualstudio.com/) — editor de código

## Estrutura do projeto

```
src/
└── app/
    ├── _layout.tsx     # Layout raiz (navegação em pilha)
    ├── index.tsx       # Tela inicial
    └── two-screen.tsx  # Tela de credenciais
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
