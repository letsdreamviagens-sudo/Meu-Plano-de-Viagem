'use client'

import { useMemo, useState } from 'react'
import ChecklistItem from '../../components/ChecklistItem'

const BASE = [
  'Documento (RG / CNH)',
  'Cartões + dinheiro',
  'Carregador + powerbank',
  'Protetor solar',
  'Capa de chuva / poncho',
  'Garrafinha de água',
  'Remédio básico',
  'Roupa extra para criança',
  'Lenço umedecido',
  'Snack para fila'
]

export default function ChecklistPage() {
  const [checked, setChecked] = useState<Record<string, boolean>>({})

  const done = useMemo(() => BASE.filter(i => checked[i]).length, [checked])

  return (
    <main className="container">
      <section className="hero">
        <h1>🧳 Checklist</h1>
        <p>Toque para marcar. {done}/{BASE.length} concluídos.</p>
      </section>

      <div className="panel">
        {BASE.map((item) => (
          <ChecklistItem
            key={item}
            label={item}
            checked={!!checked[item]}
            onToggle={() => setChecked((p) => ({ ...p, [item]: !p[item] }))}
          />
        ))}
      </div>
    </main>
  )
}
