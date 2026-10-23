import { typeColors } from '../data/typeColors'

// Tipo do Pokémon: um pontinho colorido + o nome
function TypeBadge({ name }) {
  return (
    <span className="type-badge">
      <i className="type-dot" style={{ background: typeColors[name] }} />
      {name}
    </span>
  )
}

export default TypeBadge
