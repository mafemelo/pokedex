import { useState, useEffect, useRef } from 'react'
import PokemonCard from './PokemonCard'
import '../css/Carousel.css'

// Carrossel infinito: ao passar do último Pokémon, volta para o primeiro (e vice-versa).
// O Pokémon do meio é o "ativo"; os vizinhos aparecem menores nas laterais.
function PokemonCarousel({ pokemons, favoritos, comparar, onSelect, onToggleFavorito, onToggleComparar }) {
  const [indice, setIndice] = useState(0) // posição do Pokémon que está no centro
  const inicioToque = useRef(null) // guarda onde o dedo encostou (para o gesto de arrastar)
  const total = pokemons.length

  // O operador % faz a "volta": depois do último (total - 1) vem o 0
  const proximo = () => setIndice((i) => (i + 1) % total)
  const anterior = () => setIndice((i) => (i - 1 + total) % total)

  // Setas do teclado ← →
  useEffect(() => {
    const aoApertar = (e) => {
      const digitando = ['INPUT', 'SELECT', 'TEXTAREA'].includes(e.target.tagName)
      const modalAberto = document.querySelector('.modal-overlay')
      if (digitando || modalAberto) return
      if (e.key === 'ArrowRight') setIndice((i) => (i + 1) % total)
      if (e.key === 'ArrowLeft') setIndice((i) => (i - 1 + total) % total)
    }
    window.addEventListener('keydown', aoApertar)
    return () => window.removeEventListener('keydown', aoApertar)
  }, [total])

  // Arrastar com o dedo no celular
  const aoTocar = (e) => {
    inicioToque.current = e.touches[0].clientX
  }
  const aoSoltar = (e) => {
    if (inicioToque.current === null) return
    const diferenca = e.changedTouches[0].clientX - inicioToque.current
    if (diferenca < -50) proximo()
    if (diferenca > 50) anterior()
    inicioToque.current = null
  }

  // Monta a lista dos Pokémon visíveis: o do centro (offset 0) e até 3 de cada lado
  const raio = Math.min(3, Math.floor(total / 2))
  const visiveis = []
  const jaUsados = new Set()
  for (let offset = -raio; offset <= raio; offset++) {
    const posicao = (indice + offset + total) % total
    if (jaUsados.has(posicao)) continue // evita repetir o mesmo Pokémon em listas pequenas
    jaUsados.add(posicao)
    visiveis.push({ pokemon: pokemons[posicao], offset, posicao })
  }

  const atual = pokemons[indice]

  return (
    <section className="carousel" aria-label="Carrossel de Pokémon" aria-roledescription="carrossel">
      <div className="stage" onTouchStart={aoTocar} onTouchEnd={aoSoltar}>
        <button className="arrow arrow-left" onClick={anterior} aria-label="Pokémon anterior">
          ‹
        </button>

        {visiveis.map(({ pokemon, offset, posicao }) => (
          <div
            key={pokemon.id}
            className={`slide ${offset === 0 ? 'center' : 'side'} dist-${Math.abs(offset)}`}
            style={{ '--o': offset, '--abs': Math.abs(offset) }}
            onClick={offset !== 0 ? () => setIndice(posicao) : undefined}
            inert={offset !== 0}
          >
            <PokemonCard
              pokemon={pokemon}
              favorito={favoritos.includes(pokemon.id)}
              comparando={comparar.includes(pokemon.id)}
              onSelect={onSelect}
              onToggleFavorito={onToggleFavorito}
              onToggleComparar={onToggleComparar}
            />
          </div>
        ))}

        <button className="arrow arrow-right" onClick={proximo} aria-label="Próximo Pokémon">
          ›
        </button>
      </div>

      {/* Barra para pular direto para qualquer posição */}
      <div className="jump">
        <span className="jump-text">
          {atual.name}: {indice + 1} de {total}
        </span>
        <input
          type="range"
          min="1"
          max={total}
          value={indice + 1}
          onChange={(e) => setIndice(Number(e.target.value) - 1)}
          aria-label="Ir para a posição na lista"
        />
      </div>
    </section>
  )
}

export default PokemonCarousel
