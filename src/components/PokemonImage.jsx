import { useState } from 'react'
import { imageUrl, spriteUrl } from '../data/typeColors'

// Mostra a imagem do Pokémon (fonte: PokéAPI).
// Se a imagem principal falhar, tenta o sprite pequeno; se falhar de novo, mostra uma Pokébola.
function PokemonImage({ id, name, className = '' }) {
  const [tentativa, setTentativa] = useState(0)

  if (tentativa >= 2) {
    return <div className={`pokeball-fallback ${className}`} role="img" aria-label={name} />
  }

  return (
    <img
      className={className}
      src={tentativa === 0 ? imageUrl(id) : spriteUrl(id)}
      alt={name}
      loading="lazy"
      onError={() => setTentativa(tentativa + 1)}
    />
  )
}

export default PokemonImage
