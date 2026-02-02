import Link from 'next/link'

export default function Home() {
  return (
    <main className="container">
      <section className="hero">
        <h1>Planeje sua viagem sem perrengue ✨</h1>
        <p>Explore o destino, adicione brinquedos/restaurantes no roteiro e use checklist.</p>

        <div style={{display:'flex',gap:10,flexWrap:'wrap',marginTop:14}}>
          <Link className="btn btnPrimary" href="/explorar">🎢 Explorar Beto Carrero</Link>
          <Link className="btn" href="/roteiro">🗓️ Ver Roteiro</Link>
          <Link className="btn" href="/checklist">🧳 Checklist</Link>
          <Link className="btn" href="/admin/seed">🌱 Seed</Link>
        </div>
      </section>
    </main>
  )
}
