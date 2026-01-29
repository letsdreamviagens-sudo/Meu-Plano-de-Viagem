import '../styles/globals.css'
import Link from 'next/link'

export const metadata = {
  title: 'Travel Planner',
  description: 'Planejador de viagens'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <body>
        <nav style={{ padding: 16, background: "#ffffff", borderBottom: "1px solid #eee" }}>
          <Link href="/" style={{ marginRight: 16 }}>Início</Link>
          <Link href="/explorar" style={{ marginRight: 16 }}>Explorar Destino</Link>
          <Link href="/checklist">Checklist</Link>
        </nav>
        {children}
      </body>
    </html>
  )
}
<nav className="menu">
  <Link className="btn" href="/">Início</Link>
  <Link className="btn" href="/explorar">Explorar</Link>
  <Link className="btn" href="/roteiro">Roteiro</Link>
  <Link className="btn btnPrimary" href="/checklist">Checklist</Link>
</nav>

