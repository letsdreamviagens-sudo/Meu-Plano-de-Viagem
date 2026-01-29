import Card from '@/components/Card'

const lugares = [
  {
    title: "FireWhip",
    description: "Montanha-russa invertida radical no Beto Carrero",
    image: "https://images.unsplash.com/photo-1505852679233-d9fd70aff56d",
    link: "https://www.youtube.com/results?search_query=firewhip+beto+carrero"
  },
  {
    title: "Big Tower",
    description: "Queda livre com vista do parque inteiro",
    image: "https://images.unsplash.com/photo-1511884642898-4c92249e20b6",
    link: "https://www.youtube.com/results?search_query=big+tower+beto+carrero"
  },
  {
    title: "Restaurante Temático",
    description: "Ótima opção para almoço em família",
    image: "https://images.unsplash.com/photo-1555992336-03a23c7b20ee"
  }
]

export default function Explorar() {
  return (
    <main className="container">
      <h1>🎢 Explorar Destino</h1>
      <div className="grid">
        {lugares.map((lugar, index) => (
          <Card key={index} {...lugar} />
        ))}
      </div>
    </main>
  )
}
