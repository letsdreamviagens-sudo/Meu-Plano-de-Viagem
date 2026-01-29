import './globals.css'
import Link from 'next/link'

export const metadata = {
  title: 'Travel Planner',
  description: 'Planejador de viagens'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <body>
        <div className="nav">
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
              <Link className="btn" href="/explorar">Explorar</Link>
              <Link className="btn" href="/roteiro">Roteiro</Link>
              <Link className="btn btnPrimary" href="/checklist">Checklist</Link>
            </nav>
          </div>
        </div>

        {children}
      </body>
    </html>
  )
}
