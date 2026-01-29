import Link from 'next/link'

export default function Home() {
  return (
    <main className="container">
      <section className="hero">
        <h1>Planeje sua viagem sem perrengue ✨</h1>
        <p>Roteiro + explorar destino + checklist (mala & documentos) nas suas cores.</p>
        <div style={{display:'flex',gap:10,flexWrap:'wrap',marginTop:14}}>
          <Link className="btn btnPrimary" href="/explorar">🎢 Explorar</Link>
          <Link className="btn" href="/roteiro">🗓️ Roteiro</Link>
          <Link className="btn" href="/checklist">🧳 Checklist</Link>
        </div>
      </section>
    </main>
  )
}
