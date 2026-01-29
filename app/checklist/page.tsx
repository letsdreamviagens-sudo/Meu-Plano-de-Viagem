'use client'
import ChecklistItem from '@/components/ChecklistItem'

export default function Checklist() {
  return (
    <main className="container">
      <h1>🧳 Checklist de Viagem</h1>

      <h2>Documentos</h2>
      <ChecklistItem label="RG / Passaporte" />
      <ChecklistItem label="Passagens" />
      <ChecklistItem label="Reservas de hotel" />

      <h2>Roupas</h2>
      <ChecklistItem label="Camisetas" />
      <ChecklistItem label="Pijamas" />
      <ChecklistItem label="Roupa íntima" />

      <h2>Outros</h2>
      <ChecklistItem label="Carregador de celular" />
      <ChecklistItem label="Remédios" />
      <ChecklistItem label="Protetor solar" />
    </main>
  )
}

