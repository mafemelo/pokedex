import Modal from './Modal'
import TypeBadge from './TypeBadge'
import PokemonImage from './PokemonImage'
import { typeColors, statLabels, formatId } from '../data/typeColors'
import '../css/Compare.css'

// Compara dois Pokémon lado a lado. Quem tem o maior valor no atributo fica destacado.
function CompareModal({ a, b, onClose }) {
  return (
    <Modal onClose={onClose} label="Comparação de Pokémon">
      <div className="compare">
        <div className="compare-head">
          {[a, b].map((p) => (
            <div key={p.id} className="compare-poke" style={{ '--tc': typeColors[p.types[0].name] }}>
              <PokemonImage id={p.id} name={p.name} className="compare-img" />
              <h3>{p.name}</h3>
              <span className="compare-id">{formatId(p.id)}</span>
              <div className="compare-types">
                {p.types.map((t) => (
                  <TypeBadge key={t.id} name={t.name} />
                ))}
              </div>
            </div>
          ))}
        </div>

        <ul className="compare-rows">
          {Object.keys(statLabels).map((chave) => {
            const va = a.stats[chave]
            const vb = b.stats[chave]
            return (
              <li key={chave} className="compare-row">
                <span className={`compare-val ${va > vb ? 'win' : ''}`}>{va}</span>
                <span className="compare-label">{statLabels[chave]}</span>
                <span className={`compare-val ${vb > va ? 'win' : ''}`}>{vb}</span>
              </li>
            )
          })}
        </ul>
      </div>
    </Modal>
  )
}

export default CompareModal
