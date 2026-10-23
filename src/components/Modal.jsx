import { useEffect } from 'react'
import '../css/Modal.css'

// Janela sobreposta reutilizada nos detalhes e na comparação.
// Fecha com a tecla Esc ou clicando fora da janela.
function Modal({ onClose, children, label }) {
  useEffect(() => {
    const aoApertar = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', aoApertar)
    document.body.style.overflow = 'hidden' // trava a rolagem da página de fundo

    // função de limpeza: roda quando o modal fecha
    return () => {
      window.removeEventListener('keydown', aoApertar)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-label={label}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose} aria-label="Fechar">✕</button>
        {children}
      </div>
    </div>
  )
}

export default Modal
