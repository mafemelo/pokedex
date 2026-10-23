// Filtro por tipo em formato de menu (select). "Todos" mostra todos os Pokémon.
function TypeSelect({ types, selected, onSelect }) {
  return (
    <label className="select-wrap">
      <span>Tipo</span>
      <select value={selected} onChange={(e) => onSelect(e.target.value)} aria-label="Filtrar por tipo">
        <option value="Todos">Todos os tipos</option>
        {types.map((tipo) => (
          <option key={tipo.id} value={tipo.name}>
            {tipo.name}
          </option>
        ))}
      </select>
    </label>
  )
}

export default TypeSelect
