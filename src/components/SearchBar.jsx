import '../css/SearchBar.css'

// Campo de pesquisa: a lista atualiza a cada letra digitada
function SearchBar({ value, onChange }) {
  return (
    <label className="search-bar">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
        <circle cx="11" cy="11" r="7" />
        <path d="M20 20l-3.5-3.5" />
      </svg>
      <input
        type="search"
        placeholder="Pesquisar por nome ou número"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Pesquisar Pokémon por nome ou número"
      />
    </label>
  )
}

export default SearchBar
