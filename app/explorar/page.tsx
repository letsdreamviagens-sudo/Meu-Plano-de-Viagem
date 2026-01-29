'use client'

import Card from '../../components/Card'

const items = [
  {
    id: '1',
    name: 'FireWhip',
    short_description: 'Montanha-russa invertida radical no Beto Carrero.',
    image_url:
      'https://images.unsplash.com/photo-1505852679233-d9fd70aff56d?auto=format&fit=crop&w=1200&q=80',
    youtube_url:
      'https://www.youtube.com/results?search_query=firewhip+beto+carrero',
  },
  {
    id: '2',
    name: 'Big Tower',
    short_description: 'Queda livre com vista do parque inteiro.',
    image_url:
      'https://images.unsplash.com/photo-1511884642898-4c92249e20b6?auto=format&fit=crop&w=1200&q=80',
    youtube_url:
      'https://www.youtube.com/results?search_query=big+tower+beto+carrero',
  },
]

export default function Explorar() {
  return (
    <main className="container">
      <section className="hero">
        <h1>🎢 Explorar destino</h1>
        <p>Versão estável (vamos ligar o roteiro depois).</p>
      </section>

      <div className="grid">
        {items.map((p) => (
          <Card
            key={p.id}
            title={p.name}
            description={p.short_description}
            image={p.image_url}
            link={p.youtube_url}
            onAdd={() => alert('Em breve: adicionar ao roteiro ✅')}
          />
        ))}
      </div>
    </main>
  )
}



