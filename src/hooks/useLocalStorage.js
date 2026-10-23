import { useState, useEffect } from 'react'

// Funciona igual ao useState, mas guarda o valor no navegador.
// Assim os favoritos e o tema continuam salvos ao recarregar a página.
export default function useLocalStorage(chave, valorInicial) {
  const [valor, setValor] = useState(() => {
    try {
      const salvo = localStorage.getItem(chave)
      return salvo ? JSON.parse(salvo) : valorInicial
    } catch {
      return valorInicial
    }
  })

  useEffect(() => {
    localStorage.setItem(chave, JSON.stringify(valor))
  }, [chave, valor])

  return [valor, setValor]
}
