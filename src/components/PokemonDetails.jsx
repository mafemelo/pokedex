import Modal from './Modal'
import TypeBadge from './TypeBadge'
import StatBar from './StatBar'
import PokemonImage from './PokemonImage'
import { typeColors, statLabels, formatId } from '../data/typeColors'
import '../css/PokemonDetails.css'

// Detalhes completos de um Pokémon, dentro de um modal
function PokemonDetails({ pokemon, favorito, onToggleFavorito, onClose, treinadores }) {
  const { id, name, types, stats } = pokemon
  const cor = typeColors[types[0].name]
  const total = Object.values(stats).reduce((soma, v) => soma + v, 0)

  return (
    <Modal onClose={onClose} label={`Detalhes de ${name}`}>
      <div className="details" style={{ '--tc': cor }}>
        <div className="details-hero">
          <span className="details-id">{formatId(id)}</span>
          <PokemonImage id={id} name={name} className="details-img" />
        </div>

        <div className="details-body">
          <h2 className="details-name">{name}</h2>
          <div className="details-types">
            {types.map((t) => (
              <TypeBadge key={t.id} name={t.name} />
            ))}
          </div>

          <div className="details-stats">
            {/* Object.entries transforma o objeto de stats em uma lista que o map() consegue percorrer */}
            {Object.entries(stats).map(([chave, valor]) => (
              <StatBar key={chave} label={statLabels[chave]} value={valor} />
            ))}
          </div>

          <p className="details-total">
            Total dos atributos: <strong>{total}</strong>
          </p>

          {treinadores.length > 0 && (
            <p className="details-trainers">
              Treinadores com este Pokémon: <strong>{treinadores.join(', ')}</strong>
            </p>
          )}

          <button
            className={`btn ${favorito ? 'btn-primary' : 'btn-ghost'}`}
            onClick={() => onToggleFavorito(id)}
          >
            {favorito ? '★ Nos favoritos' : '☆ Adicionar aos favoritos'}
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default PokemonDetails
