import PokemonCard from './PokemonCard'
import '../css/PokemonList.css'

// Percorre a lista com map() e cria um PokemonCard para cada Pokémon
function PokemonList({ pokemons, favoritos, comparar, onSelect, onToggleFavorito, onToggleComparar }) {
  return (
    <section className="pokemon-list" aria-label="Lista de Pokémon">
      {pokemons.map((p) => (
        <PokemonCard
          key={p.id}
          pokemon={p}
          favorito={favoritos.includes(p.id)}
          comparando={comparar.includes(p.id)}
          onSelect={onSelect}
          onToggleFavorito={onToggleFavorito}
          onToggleComparar={onToggleComparar}
        />
      ))}
    </section>
  )
}

export default PokemonList
