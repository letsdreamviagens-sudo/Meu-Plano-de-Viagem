import './globals.css'
import Link from 'next/link'

export const metadata = {
  title: 'Meu Plano de Viagem',
  description: 'Roteiro + explorar + checklist'
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
                <div className="brandName">Meu Plano de Viagem</div>
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
        </header>
        {children}
      </body>
    </html>
  )
}
