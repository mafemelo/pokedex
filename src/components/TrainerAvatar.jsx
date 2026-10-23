import '../css/Trainers.css'

// Se você tiver fotos reais, coloque em src/assets/images/trainers/
// com o nome do treinador em minúsculo, por exemplo: ash.png, brock.png, lt-surge.png, team-rocket.png
// O Vite encontra esses arquivos automaticamente. Sem foto, aparece o avatar desenhado abaixo.
const fotos = import.meta.glob('../assets/images/trainers/*.{png,jpg,jpeg,webp}', {
  eager: true,
  import: 'default',
})

// Aparência de cada treinador (cores e acessórios)
const visuais = {
  Ash: { fundo: ['#7fc4ff', '#3a7bd5'], pele: '#f2c9a0', cabelo: '#2b2220', roupa: '#2f6fdc', extra: 'bone', marcas: true },
  Brock: { fundo: ['#ffd89b', '#d98c3a'], pele: '#c98f5a', cabelo: '#3b2a1e', roupa: '#e8892f', extra: 'olhosFechados', colete: '#4f8f3a' },
  Misty: { fundo: ['#9be7ff', '#2b8fd6'], pele: '#f6d3b3', cabelo: '#ff8a3d', roupa: '#ffd84a', extra: 'rabo', suspensorio: '#e63946' },
  'Lt. Surge': { fundo: ['#fff59b', '#d9a400'], pele: '#e8b98c', cabelo: '#f2d04a', roupa: '#5b7d3a', extra: 'militar', oculos: true },
  Erika: { fundo: ['#c8f5c0', '#4cae6a'], pele: '#f6d9bf', cabelo: '#1d1a1f', roupa: '#e0507a', extra: 'flor' },
  Koga: { fundo: ['#d9b3ff', '#6b3fa0'], pele: '#e3b78e', cabelo: '#2a2430', roupa: '#6b3fa0', extra: 'ninja' },
  Sabrina: { fundo: ['#e9b8ff', '#8b4fd0'], pele: '#f6d9bf', cabelo: '#1b1b2b', roupa: '#8b4fd0', extra: 'longo' },
  Blaine: { fundo: ['#ffb199', '#e3350d'], pele: '#e8b98c', cabelo: '#eeeeee', roupa: '#f4f4f4', extra: 'jaleco', oculos: true },
  Giovanni: { fundo: ['#b8b8c8', '#33333f'], pele: '#e8b98c', cabelo: '#3a2a22', roupa: '#23232b', extra: 'terno' },
  Gary: { fundo: ['#e1c8ff', '#7a4fd6'], pele: '#f2c9a0', cabelo: '#7a5632', roupa: '#7a4fd6', extra: 'colar', espetado: true },
  'Team Rocket': { fundo: ['#e8e8f0', '#8f8fa8'], pele: '#f2c9a0', cabelo: '#1d1a1f', roupa: '#f4f4f4', extra: 'rocket' },
  Lance: { fundo: ['#ffc08a', '#d4352a'], pele: '#f0c8a0', cabelo: '#d4352a', roupa: '#23232b', extra: 'capa', espetado: true },
}

const padrao = { fundo: ['#c8cde8', '#6b73a8'], pele: '#f2c9a0', cabelo: '#3b2a1e', roupa: '#6b73a8', extra: '' }

// Desenho do avatar (SVG 100x100). Cada parte é desenhada por cima da anterior.
function Desenho({ nome, v, id }) {
  return (
    <svg viewBox="0 0 100 100" role="img" aria-label={`Avatar de ${nome}`} className="avatar-svg">
      <defs>
        <linearGradient id={`fundo-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={v.fundo[0]} />
          <stop offset="1" stopColor={v.fundo[1]} />
        </linearGradient>
        <clipPath id={`corte-${id}`}>
          <circle cx="50" cy="50" r="50" />
        </clipPath>
      </defs>

      <g clipPath={`url(#corte-${id})`}>
        <rect width="100" height="100" fill={`url(#fundo-${id})`} />

        {/* cabelo de trás */}
        {v.extra === 'longo' && <path d="M24 46C22 20 78 20 76 46L80 92H20Z" fill={v.cabelo} />}
        {v.extra === 'rabo' && <path d="M70 34c14 4 16 22 6 34c-2-10-8-14-14-16Z" fill={v.cabelo} />}
        {v.extra === 'capa' && <path d="M8 100L16 66L50 60L84 66L92 100Z" fill="#f08a24" />}

        {/* corpo */}
        <path d="M14 100C14 76 30 66 50 66S86 76 86 100Z" fill={v.roupa} />
        {v.colete && <path d="M30 100L36 72L50 82L64 72L70 100Z" fill={v.colete} />}
        {v.suspensorio && (
          <>
            <rect x="34" y="70" width="5" height="30" fill={v.suspensorio} />
            <rect x="61" y="70" width="5" height="30" fill={v.suspensorio} />
          </>
        )}
        {v.extra === 'jaleco' && <path d="M50 70L40 100H60Z" fill="#e3350d" />}
        {v.extra === 'terno' && (
          <>
            <path d="M50 68L38 100H62Z" fill="#f4f4f4" />
            <path d="M50 76l-4 6 4 18 4-18Z" fill="#c0392b" />
          </>
        )}
        {v.extra === 'militar' && <path d="M38 70C40 80 60 80 62 70L56 100H44Z" fill="#46622c" />}
        {v.extra === 'colar' && <circle cx="50" cy="76" r="4" fill="#ffd84a" stroke="#8a6d00" strokeWidth="1.2" />}
        {v.extra === 'rocket' && (
          <text x="50" y="92" textAnchor="middle" fontSize="22" fontWeight="800" fill="#e3350d" fontFamily="Arial, sans-serif">
            R
          </text>
        )}
        {v.extra === 'capa' && <path d="M26 66L40 100L50 70L60 100L74 66Z" fill="#23232b" />}
        {v.extra === 'flor' && <circle cx="50" cy="80" r="5" fill="#ffd1dc" />}
        {v.extra === 'ninja' && <path d="M32 70L50 84L68 70L66 100H34Z" fill="#4e2d78" />}

        {/* pescoço */}
        <rect x="43" y="58" width="14" height="14" rx="5" fill={v.pele} />

        {/* cabeça */}
        <ellipse cx="50" cy="44" rx="20" ry="22" fill={v.pele} />
        <ellipse cx="30" cy="46" rx="3.5" ry="5" fill={v.pele} />
        <ellipse cx="70" cy="46" rx="3.5" ry="5" fill={v.pele} />

        {/* cabelo da frente */}
        {!['ninja', 'rocket'].includes(v.extra) && (
          <path
            d={
              v.espetado
                ? 'M29 40L26 22L38 30L42 14L50 28L58 14L62 30L74 22L71 40C66 30 34 30 29 40Z'
                : 'M29 42C26 20 74 20 71 42C66 32 34 32 29 42Z'
            }
            fill={v.cabelo}
          />
        )}
        {v.extra === 'militar' && <path d="M28 36L32 20H68L72 36C64 28 36 28 28 36Z" fill={v.cabelo} />}
        {v.extra === 'longo' && <path d="M29 44C27 22 73 22 71 44C64 34 36 34 29 44Z" fill={v.cabelo} />}

        {/* bonés e faixas */}
        {v.extra === 'bone' && (
          <>
            <path d="M28 38C28 14 72 14 72 38Z" fill="#e63946" />
            <path d="M24 38H80L74 43H28Z" fill="#c92a37" />
            <circle cx="50" cy="26" r="5" fill="#fff" stroke="#14172b" strokeWidth="1.4" />
          </>
        )}
        {v.extra === 'rocket' && (
          <>
            <path d="M28 38C28 14 72 14 72 38Z" fill="#f4f4f4" stroke="#c8c8d4" strokeWidth="1.2" />
            <path d="M24 38H80L74 43H28Z" fill="#dcdce6" />
            <text x="50" y="33" textAnchor="middle" fontSize="13" fontWeight="800" fill="#e3350d" fontFamily="Arial, sans-serif">
              R
            </text>
          </>
        )}
        {v.extra === 'ninja' && (
          <>
            <path d="M28 36C30 18 70 18 72 36Z" fill={v.cabelo} />
            <rect x="29" y="31" width="42" height="7" rx="2" fill="#4e2d78" />
            <path d="M31 54C40 66 60 66 69 54L69 50H31Z" fill="#4e2d78" />
          </>
        )}
        {v.extra === 'flor' && (
          <>
            <circle cx="66" cy="30" r="4" fill="#ff8fb1" />
            <circle cx="71" cy="34" r="3.4" fill="#ffd1dc" />
            <circle cx="64" cy="35" r="3.2" fill="#ff8fb1" />
          </>
        )}

        {/* rosto */}
        {v.extra === 'olhosFechados' ? (
          <>
            <path d="M38 46H46" stroke="#14172b" strokeWidth="2.4" strokeLinecap="round" />
            <path d="M54 46H62" stroke="#14172b" strokeWidth="2.4" strokeLinecap="round" />
          </>
        ) : (
          <>
            <ellipse cx="42" cy="46" rx="2.6" ry="3.4" fill="#14172b" />
            <ellipse cx="58" cy="46" rx="2.6" ry="3.4" fill="#14172b" />
          </>
        )}
        {v.marcas && (
          <g stroke="#14172b" strokeWidth="1.2" strokeLinecap="round">
            <path d="M33 52H37M33 55H37" />
            <path d="M63 52H67M63 55H67" />
          </g>
        )}
        {v.oculos && (
          <g fill="rgba(20,23,43,0.75)" stroke="#14172b" strokeWidth="1.5">
            <rect x="35" y="41" width="13" height="9" rx="3" />
            <rect x="52" y="41" width="13" height="9" rx="3" />
            <path d="M48 45H52" />
          </g>
        )}
        {v.extra !== 'ninja' && (
          <path d="M43 57Q50 62 57 57" fill="none" stroke="#14172b" strokeWidth="2" strokeLinecap="round" />
        )}
        {v.extra === 'jaleco' && <path d="M40 58Q50 66 60 58Q50 62 40 58Z" fill="#eeeeee" />}
        {v.extra === 'terno' && <path d="M42 56Q50 52 58 56Q50 59 42 56Z" fill="#3a2a22" />}
      </g>
    </svg>
  )
}

// Mostra a foto (se existir na pasta) ou o avatar desenhado
function TrainerAvatar({ nome }) {
  const slug = nome.toLowerCase().replace(/[^a-z0-9]+/g, '-')
  const achada = Object.entries(fotos).find(([caminho]) => caminho.includes(`/${slug}.`))
  const v = visuais[nome] || padrao

  return (
    <div className="trainer-avatar">
      {achada ? <img src={achada[1]} alt={nome} /> : <Desenho nome={nome} v={v} id={slug} />}
    </div>
  )
}

export default TrainerAvatar
