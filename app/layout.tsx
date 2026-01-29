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
        <header className="nav">
          <div className="navInner">
            <div className="brand">
              <span className="brandIcon">✈️</span>
              <div>
                <div className="brandName">Travel Planner</div>
                <div className="brandSub">roteiro • checklist • família</div>
              </div>
            </div>

            <nav className="menu">
              <Link className="btn" href="/">Início</Link>
              <Link className="btn" href="/explorar">Explorar Destino</Link>
              <Link className="btn btnPrimary" href="/checklist">Checklist</Link>
              <Link className="btn" href="/roteiro">Roteiro</Link>
            </nav>
          </div>
        </header>

        {children}
      </body>
    </html>
  )
}
