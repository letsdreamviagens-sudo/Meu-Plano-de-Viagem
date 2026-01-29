type CardProps = {
  title: string
  description: string
  image: string
  link?: string
  onAdd?: () => void | Promise<void>
}

export default function Card({ title, description, image, link, onAdd }: CardProps) {
  return (
    <div className="card">
      <img src={image} alt={title} style={{ width: '100%', height: 170, objectFit: 'cover', display: 'block' }} />
      <div className="cardBody">
        <h3 className="cardTitle">{title}</h3>
        <p className="cardDesc">{description}</p>

        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {onAdd && (
            <button className="btn btnPrimary" onClick={() => void onAdd()}>
              ➕ Adicionar ao roteiro
            </button>
          )}
          {link && (
            <a className="btn" href={link} target="_blank" rel="noreferrer">
              ▶️ Ver vídeo
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
