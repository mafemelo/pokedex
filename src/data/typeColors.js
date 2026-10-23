// Cor de cada tipo de Pokémon (usada nos cards, badges e filtros)
export const typeColors = {
  Typeless: '#9aa0a6',
  Normal: '#a8a77a',
  Fire: '#ff7a2f',
  Water: '#4f9bff',
  Grass: '#4cc05a',
  Electric: '#f9cf30',
  Ice: '#7fdcec',
  Fighting: '#d4412f',
  Poison: '#b05bd0',
  Ground: '#d9b45a',
  Flying: '#8fa8f5',
  Psychic: '#ff5f9e',
  Bug: '#9bc12a',
  Rock: '#b8a05a',
  Ghost: '#7a62b8',
  Dark: '#6b5a50',
  Dragon: '#6c4cf0',
  Steel: '#9aaabf',
}

// Nomes dos atributos em português (a ordem define a ordem das barras)
export const statLabels = {
  hp: 'HP',
  attack: 'Ataque',
  defense: 'Defesa',
  specialAttack: 'Ataque Esp.',
  specialDefense: 'Defesa Esp.',
  speed: 'Velocidade',
}

// Formata o ID como #001
export const formatId = (id) => `#${String(id).padStart(3, '0')}`

// Fonte das imagens: PokéAPI (repositório público de sprites)
export const imageUrl = (id) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`

export const spriteUrl = (id) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
