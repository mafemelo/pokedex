// Barra de progresso de um atributo (HP, Ataque...)
// O valor máximo de um atributo em Pokémon é 255, por isso usamos 255 como 100%
function StatBar({ label, value, max = 255 }) {
  const largura = Math.min((value / max) * 100, 100)

  return (
    <div className="stat-bar">
      <span className="stat-label">{label}</span>
      <span className="stat-value">{value}</span>
      <div className="stat-track">
        <div className="stat-fill" style={{ width: `${largura}%` }} />
      </div>
    </div>
  )
}

export default StatBar
