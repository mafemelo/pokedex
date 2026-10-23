import '../css/Header.css'

// Cabeçalho simples: título, abas e ações
function Header({ aba, onChangeAba, tema, onToggleTema, onAleatorio, totalFavoritos }) {
  return (
    <header className="header">
      <h1 className="brand">Pokédex</h1>

      <nav className="tabs" aria-label="Seções">
        <button className={aba === 'pokedex' ? 'tab active' : 'tab'} onClick={() => onChangeAba('pokedex')}>
          Pokémon
        </button>
        <button className={aba === 'treinadores' ? 'tab active' : 'tab'} onClick={() => onChangeAba('treinadores')}>
          Treinadores
        </button>
      </nav>

      <div className="header-actions">
        <span className="fav-count">★ {totalFavoritos}</span>
        <button className="link-btn" onClick={onAleatorio}>
          Aleatório
        </button>
        <button className="link-btn" onClick={onToggleTema}>
          {tema === 'dark' ? 'Tema claro' : 'Tema escuro'}
        </button>
      </div>
    </header>
  )
}

export default Header
