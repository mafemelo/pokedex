import '../css/EmptyState.css'

// Aparece quando nenhum Pokémon é encontrado
function EmptyState({ onClear, mensagem }) {
  return (
    <div className="empty-state">
      <h2>Nenhum Pokémon encontrado</h2>
      <p>{mensagem}</p>
      <button className="btn btn-primary" onClick={onClear}>
        Limpar filtros
      </button>
    </div>
  )
}

export default EmptyState
