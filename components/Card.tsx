import Image from 'next/image'

type CardProps = {
  title: string
  description: string
  image?: string | null
  link?: string
  tags?: string[]
  onAdd?: () => void | Promise<void>
}

export default function Card({ title, description, image, link, tags = [], onAdd }: CardProps) {
  return (
    <div className="card">
      <div style={{ position: 'relative' }}>
        {image ? (
          <Image
            src={image}
            alt={title}
            width={1200}
            height={700}
            style={{ width: '100%', height: 170, objectFit: 'cover', display: 'block' }}
          />
        ) : (
          <div style={{ height: 170, display:'flex', alignItems:'center', justifyContent:'center' }} className="badge">
            Sem foto (por enquanto)
          </div>
        )}
      </div>

      <div className="cardBody">
        <h3 className="cardTitle">{title}</h3>
        <p className="cardDesc">{description}</p>

        {tags.length > 0 && (
          <div className="metaRow">
            {tags.filter(Boolean).slice(0, 4).map((t) => (
              <span key={t} className="badge">{t}</span>
            ))}
          </div>
        )}

        <div className="stack">
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
