type CardProps = {
  title: string
  description: string
  image: string
  link?: string
}

export default function Card({ title, description, image, link }: CardProps) {
  return (
    <div style={{
      background: "#fff",
      borderRadius: 12,
      overflow: "hidden",
      boxShadow: "0 4px 10px rgba(0,0,0,0.08)"
    }}>
      <img src={image} alt={title} style={{ width: "100%", height: 160, objectFit: "cover" }} />
      <div style={{ padding: 12 }}>
        <h3>{title}</h3>
        <p style={{ fontSize: 14 }}>{description}</p>
        {link && (
          <a href={link} target="_blank" style={{ color: "#0070f3" }}>
            Ver vídeo
          </a>
        )}
      </div>
    </div>
  )
}
