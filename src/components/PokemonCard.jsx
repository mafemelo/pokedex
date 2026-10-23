import { typeColors, formatId } from '../data/typeColors'
import TypeBadge from './TypeBadge'
import PokemonImage from './PokemonImage'
import '../css/PokemonCard.css'

// Card de um Pokémon na lista.
// Recebe os dados e as funções do App por props.
function PokemonCard({
  pokemon,
  favorito,
  comparando,
  onSelect,
  onToggleFavorito,
  onToggleComparar,
}) {
  const { id, name, types, stats } = pokemon
  // A cor suave de fundo da imagem vem do primeiro tipo do Pokémon
  const cor = typeColors[types[0].name]

  return (
    <article className="pokemon-card" style={{ '--tc': cor }}>
      <div className="card-top">
        <span className="card-id">{formatId(id)}</span>
        <div className="card-actions">
          <button
            className={`icon-btn ${favorito ? 'on' : ''}`}
            onClick={() => onToggleFavorito(id)}
            aria-pressed={favorito}
            aria-label={favorito ? `Remover ${name} dos favoritos` : `Favoritar ${name}`}
            title="Favoritar"
          >
            {favorito ? '★' : '☆'}
          </button>
          <button
            className={`icon-btn ${comparando ? 'on' : ''}`}
            onClick={() => onToggleComparar(id)}
            aria-pressed={comparando}
            aria-label={comparando ? `Tirar ${name} da comparação` : `Comparar ${name}`}
            title="Comparar"
          >
            ⇄
          </button>
        </div>
      </div>

      <button className="card-main" onClick={() => onSelect(pokemon)} aria-label={`Ver detalhes de ${name}`}>
        <div className="card-art">
          <PokemonImage id={id} name={name} className="card-img" />
        </div>
        <h3 className="card-name">{name}</h3>
        <div className="card-types">
          {types.map((t) => (
            <TypeBadge key={t.id} name={t.name} />
          ))}
        </div>
      </button>

      <dl className="card-stats">
        <div><dt>HP</dt><dd>{stats.hp}</dd></div>
        <div><dt>ATK</dt><dd>{stats.attack}</dd></div>
        <div><dt>DEF</dt><dd>{stats.defense}</dd></div>
        <div><dt>SP.A</dt><dd>{stats.specialAttack}</dd></div>
        <div><dt>SP.D</dt><dd>{stats.specialDefense}</dd></div>
        <div><dt>SPD</dt><dd>{stats.speed}</dd></div>
      </dl>
    </article>
  )
}

export default PokemonCard
