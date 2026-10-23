# 🎮 Pokédex React + Vite

Pokédex interativa feita para a **Atividade 03** (React + Vite). Mostra os 151 Pokémon do arquivo `pokedex-data.json`, com pesquisa, filtro por tipo, detalhes, treinadores e vários desafios opcionais.

## ✨ Funcionalidades

**Obrigatórias**
- Lista de Pokémon (em **carrossel infinito** ou em grade) com ID, nome, tipos e os 6 atributos (HP, Ataque, Defesa, Ataque Esp., Defesa Esp. e Velocidade)
- Pesquisa por **nome** ou **ID**, atualizando enquanto digita
- Filtro por **tipo** (menu dropdown)
- Detalhes do Pokémon em um **modal** com barras de atributos
- Área de **Treinadores** com insígnias e Pokémon de cada um
- Mensagem amigável quando nenhum Pokémon é encontrado
- Layout responsivo (desktop, tablet e celular)

**Desafios opcionais feitos**
- ⭐ Favoritos (ficam salvos no navegador)
- ⚔️ Comparação de dois Pokémon
- 📊 Ordenação por número, nome e todos os atributos
- 🎲 Pokémon aleatório (botão "Surpreenda-me")
- 🌙 Tema claro/escuro
- 🎠 Carrossel infinito: setas, teclado (← →), arrastar no celular e barra para pular para qualquer posição
- 🌐 Imagens da PokéAPI

## ▶️ Como executar

Pré-requisito: [Node.js](https://nodejs.org) instalado.

```bash
npm install
npm run dev
```

Abra no navegador: **http://localhost:5173**

Para gerar a versão final: `npm run build`

## 📁 Onde estão os dados

Em `src/data/pokedex-data.json` (Pokémon, tipos e treinadores). O arquivo é importado direto no `App.jsx`, sem banco de dados.

## 🎨 Visual

Design minimalista, com tema claro e escuro e a fonte **Hanken Grotesk** (Google Fonts, carregada no `index.html`).

## 🧑‍🚀 Fotos dos treinadores

Os avatares dos treinadores são **desenhos feitos em SVG** (componente `TrainerAvatar.jsx`), então funcionam sem internet e não têm problema de direitos de imagem.
Para usar fotos reais, coloque os arquivos em `src/assets/images/trainers/` com o nome do treinador em minúsculo (`ash.png`, `lt-surge.png`, `team-rocket.png`...). Se a foto existir, ela substitui o avatar desenhado.

## 🖼️ Fonte das imagens

As imagens vêm da **PokéAPI** (repositório público de sprites):
https://github.com/PokeAPI/sprites

Se uma imagem não carregar, o app tenta o sprite pequeno e, por fim, mostra uma Pokébola desenhada em CSS. Os dados continuam vindo do `pokedex-data.json`.

## 🧩 Organização do projeto

```text
src/
├── components/
│   ├── Header.jsx          # logo, abas, tema e sorteio
│   ├── SearchBar.jsx       # campo de pesquisa
│   ├── TypeSelect.jsx      # filtro por tipo (select)
│   ├── PokemonCarousel.jsx # carrossel infinito
│   ├── PokemonList.jsx     # visualização em grade, com map()
│   ├── PokemonCard.jsx     # card de cada Pokémon
│   ├── PokemonDetails.jsx  # detalhes (modal)
│   ├── CompareModal.jsx    # comparação de 2 Pokémon
│   ├── TrainerList.jsx     # treinadores
│   ├── TrainerAvatar.jsx   # avatar/foto do treinador
│   ├── StatBar.jsx         # barra de atributo
│   ├── TypeBadge.jsx       # etiqueta de tipo
│   ├── PokemonImage.jsx    # imagem com plano B
│   ├── Modal.jsx           # janela reutilizável
│   └── EmptyState.jsx      # "nenhum Pokémon encontrado"
├── css/                    # um arquivo de estilo por componente
├── data/
│   ├── pokedex-data.json
│   └── typeColors.js       # cores dos tipos e funções auxiliares
├── hooks/
│   └── useLocalStorage.js  # salva favoritos e tema
├── App.jsx                 # estados e lógica principal
└── main.jsx
```

## ⚛️ Conceitos de React usados

- Componentes funcionais e **props**
- **`useState`** para busca, tipo, ordenação, favoritos, modal e tema
- **`useEffect`** para o tema, a tecla Esc e o salvamento no navegador
- **`useMemo`** para a lista filtrada (estado derivado)
- Renderização de listas com **`map()`** e `key`
- Eventos: `onClick`, `onChange`
- Filtragem com `filter()` e ordenação com `sort()`

## 👥 Dupla

- Nome 1
- Nome 2
