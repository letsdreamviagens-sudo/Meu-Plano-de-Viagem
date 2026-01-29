import Link from 'next/link'

export default function Home() {
  return (
    <main className="container">
      <section className="hero">
        <h1>Planeje sua viagem sem perrengue ✨</h1>
        <p>Roteiro + explorar destino + checklist (mala & documentos) no seu estilo.</p>

        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 14 }}>
          <Link className="btn btnPrimary" href="/explorar">🎢 Explorar destino</Link>
          <Link className="btn" href="/checklist">🧳 Checklist</Link>
          <Link className="btn" href="/roteiro">🗓️ Roteiro</Link>
        </div>
      </section>
    </main>
  )
}
