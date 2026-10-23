import { useState, useEffect, useMemo } from 'react'
import dados from './data/pokedex-data.json'
import useLocalStorage from './hooks/useLocalStorage'

import Header from './components/Header'
import SearchBar from './components/SearchBar'
import TypeSelect from './components/TypeSelect'
import PokemonList from './components/PokemonList'
import PokemonCarousel from './components/PokemonCarousel'
import PokemonDetails from './components/PokemonDetails'
import CompareModal from './components/CompareModal'
import TrainerList from './components/TrainerList'
import EmptyState from './components/EmptyState'

// Opções do menu "Ordenar por"
const opcoesOrdem = [
  { valor: 'id', texto: 'Número' },
  { valor: 'name', texto: 'Nome (A–Z)' },
  { valor: 'hp', texto: 'HP (maior)' },
  { valor: 'attack', texto: 'Ataque (maior)' },
  { valor: 'defense', texto: 'Defesa (maior)' },
  { valor: 'specialAttack', texto: 'Ataque Esp. (maior)' },
  { valor: 'specialDefense', texto: 'Defesa Esp. (maior)' },
  { valor: 'speed', texto: 'Velocidade (maior)' },
]

// Alguns Pokémon (como o Mew) vêm com a lista de tipos vazia no JSON.
// Para o app não quebrar, eles recebem o tipo "Typeless", que já existe no arquivo.
const pokemons = dados.pokemon.map((p) =>
  p.types.length > 0 ? p : { ...p, types: [{ id: 0, name: 'Typeless' }] },
)

function App() {
  const { trainers, types } = dados

  // ---------- ESTADOS ----------
  const [aba, setAba] = useState('pokedex') // 'pokedex' ou 'treinadores'
  const [busca, setBusca] = useState('')
  const [tipo, setTipo] = useState('Todos')
  const [ordem, setOrdem] = useState('id')
  const [soFavoritos, setSoFavoritos] = useState(false)
  const [selecionado, setSelecionado] = useState(null) // Pokémon aberto nos detalhes
  const [comparar, setComparar] = useState([]) // ids de até 2 Pokémon
  const [mostrarComparacao, setMostrarComparacao] = useState(false)
  const [favoritos, setFavoritos] = useLocalStorage('pokedex-favoritos', [])
  const [tema, setTema] = useLocalStorage('pokedex-tema', 'light')
  const [visao, setVisao] = useLocalStorage('pokedex-visao', 'carrossel') // 'carrossel' ou 'grade'

  // Aplica o tema na página (o CSS usa o atributo data-theme)
  useEffect(() => {
    document.documentElement.dataset.theme = tema
  }, [tema])

  // ---------- DADOS DERIVADOS ----------
  // Só mostramos no filtro os tipos que realmente aparecem nos Pokémon
  const tiposUsados = useMemo(() => {
    const nomes = new Set(pokemons.flatMap((p) => p.types.map((t) => t.name)))
    return types.filter((t) => nomes.has(t.name))
  }, [types])

  // Aplica pesquisa + filtro de tipo + favoritos + ordenação
  const pokemonsFiltrados = useMemo(() => {
    const texto = busca.trim().toLowerCase().replace('#', '')

    const lista = pokemons.filter((p) => {
      const bateBusca =
        texto === '' ||
        p.name.toLowerCase().includes(texto) ||
        String(p.id).includes(texto) // permite pesquisar "25" ou "025"
      const bateTipo = tipo === 'Todos' || p.types.some((t) => t.name === tipo)
      const bateFavorito = !soFavoritos || favoritos.includes(p.id)
      return bateBusca && bateTipo && bateFavorito
    })

    // [...lista] cria uma cópia, pois sort() altera o array original
    return [...lista].sort((a, b) => {
      if (ordem === 'id') return a.id - b.id
      if (ordem === 'name') return a.name.localeCompare(b.name)
      return b.stats[ordem] - a.stats[ordem] // atributos: do maior para o menor
    })
  }, [busca, tipo, ordem, soFavoritos, favoritos])

  // ---------- FUNÇÕES (eventos) ----------
  const limparFiltros = () => {
    setBusca('')
    setTipo('Todos')
    setSoFavoritos(false)
  }

  const alternarFavorito = (id) => {
    setFavoritos((atual) => (atual.includes(id) ? atual.filter((f) => f !== id) : [...atual, id]))
  }

  const alternarComparar = (id) => {
    setComparar((atual) => {
      if (atual.includes(id)) return atual.filter((c) => c !== id)
      if (atual.length === 2) return [atual[1], id] // já tem 2: o mais antigo sai
      return [...atual, id]
    })
  }

  const sortearPokemon = () => {
    const sorteado = pokemons[Math.floor(Math.random() * pokemons.length)]
    setSelecionado(sorteado)
  }

  const abrirPokemon = (pokemon) => setSelecionado(pokemon)
  const fecharDetalhes = () => setSelecionado(null)
  const fecharComparacao = () => setMostrarComparacao(false)

  // Nomes dos treinadores que têm o Pokémon selecionado
  const treinadoresDoSelecionado = selecionado
    ? trainers.filter((t) => t.pokemonIds.includes(selecionado.id)).map((t) => t.name)
    : []

  const pokemonA = pokemons.find((p) => p.id === comparar[0])
  const pokemonB = pokemons.find((p) => p.id === comparar[1])

  // ---------- TELA ----------
  return (
    <div className="app">
      <Header
        aba={aba}
        onChangeAba={setAba}
        tema={tema}
        onToggleTema={() => setTema(tema === 'dark' ? 'light' : 'dark')}
        onAleatorio={sortearPokemon}
        totalFavoritos={favoritos.length}
      />

      <main className="main">
        {aba === 'pokedex' ? (
          <>
            <section className="controls" aria-label="Pesquisa e filtros">
              <div className="controls-top">
                <SearchBar value={busca} onChange={setBusca} />

                <TypeSelect types={tiposUsados} selected={tipo} onSelect={setTipo} />

                <label className="select-wrap">
                  <span>Ordenar</span>
                  <select value={ordem} onChange={(e) => setOrdem(e.target.value)}>
                    {opcoesOrdem.map((o) => (
                      <option key={o.valor} value={o.valor}>
                        {o.texto}
                      </option>
                    ))}
                  </select>
                </label>

                <button
                  className={`btn ${soFavoritos ? 'btn-primary' : 'btn-ghost'}`}
                  onClick={() => setSoFavoritos(!soFavoritos)}
                  aria-pressed={soFavoritos}
                >
                  Favoritos
                </button>

                <div className="view-toggle" role="group" aria-label="Forma de visualização">
                  <button
                    className={visao === 'carrossel' ? 'active' : ''}
                    onClick={() => setVisao('carrossel')}
                    aria-pressed={visao === 'carrossel'}
                  >
                    Carrossel
                  </button>
                  <button
                    className={visao === 'grade' ? 'active' : ''}
                    onClick={() => setVisao('grade')}
                    aria-pressed={visao === 'grade'}
                  >
                    Grade
                  </button>
                </div>
              </div>
            </section>

            <p className="result-count" aria-live="polite">
              Mostrando {pokemonsFiltrados.length} de {pokemons.length} Pokémon
            </p>

            {pokemonsFiltrados.length === 0 ? (
              <EmptyState
                onClear={limparFiltros}
                mensagem={
                  soFavoritos && favoritos.length === 0
                    ? 'Você ainda não favoritou nenhum Pokémon. Toque na estrela de um card para salvar.'
                    : 'Tente outro nome, número ou tipo.'
                }
              />
            ) : visao === 'carrossel' ? (
              // a key faz o carrossel voltar ao início sempre que a busca, o tipo ou a ordem mudam
              <PokemonCarousel
                key={`${busca}|${tipo}|${ordem}|${soFavoritos}`}
                pokemons={pokemonsFiltrados}
                favoritos={favoritos}
                comparar={comparar}
                onSelect={abrirPokemon}
                onToggleFavorito={alternarFavorito}
                onToggleComparar={alternarComparar}
              />
            ) : (
              <PokemonList
                pokemons={pokemonsFiltrados}
                favoritos={favoritos}
                comparar={comparar}
                onSelect={abrirPokemon}
                onToggleFavorito={alternarFavorito}
                onToggleComparar={alternarComparar}
              />
            )}
          </>
        ) : (
          <>
            <h2 className="page-title">Treinadores de Kanto</h2>
            <p className="page-sub">Clique em um Pokémon da equipe para ver os detalhes.</p>
            <TrainerList treinadores={trainers} pokemons={pokemons} onSelectPokemon={abrirPokemon} />
          </>
        )}
      </main>

      {/* Barra de comparação: aparece quando há Pokémon marcados com ⚔ */}
      {aba === 'pokedex' && comparar.length > 0 && (
        <div className="compare-bar" role="region" aria-label="Comparação">
          <span>
            {comparar.length === 1
              ? `${pokemonA.name} selecionado. Escolha mais um com ⇄`
              : `${pokemonA.name} × ${pokemonB.name}`}
          </span>
          <button
            className="btn btn-primary"
            disabled={comparar.length < 2}
            onClick={() => setMostrarComparacao(true)}
          >
            Comparar
          </button>
          <button className="btn btn-ghost" onClick={() => setComparar([])}>
            Limpar
          </button>
        </div>
      )}

      {selecionado && (
        <PokemonDetails
          pokemon={selecionado}
          favorito={favoritos.includes(selecionado.id)}
          onToggleFavorito={alternarFavorito}
          onClose={fecharDetalhes}
          treinadores={treinadoresDoSelecionado}
        />
      )}

      {mostrarComparacao && pokemonA && pokemonB && (
        <CompareModal a={pokemonA} b={pokemonB} onClose={fecharComparacao} />
      )}

      <footer className="footer">
        Dados: pokedex-data.json. Imagens: PokéAPI (github.com/PokeAPI/sprites).
      </footer>
    </div>
  )
}

export default App
