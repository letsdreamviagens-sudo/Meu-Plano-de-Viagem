'use client'

import { useState } from 'react'
import { supabase } from '../../../lib/supabaseClient'
import { BETO_CARRERO_ITEMS } from '../../../data/beto-carrero'

export default function SeedPage() {
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState<string>('')

  const runSeed = async () => {
    if (!supabase) {
      setMsg('Supabase não está configurado.')
      return
    }

    setLoading(true)
    setMsg('Inserindo itens…')

    // Converte para o formato da tabela "places"
    const rows = BETO_CARRERO_ITEMS.map((i) => ({
      name: i.name,
      category: i.category,
      short_description: i.short_description,
      image_url: i.image_url,
      youtube_url: i.youtube_url,
      queue_level: i.queue_level,
      min_height_cm: i.min_height_cm,
      city: 'Penha',
      is_kid_friendly: i.profile !== 'radical',
    }))

    // Evita duplicar: tenta inserir só o que não existe por nome
    // 1) pega nomes já existentes
    const names = rows.map(r => r.name)
    const { data: existing, error: selErr } = await supabase
      .from('places')
      .select('name')
      .in('name', names)

    if (selErr) {
      console.error(selErr)
      setMsg('Erro buscando existentes (console).')
      setLoading(false)
      return
    }

    const existingNames = new Set((existing || []).map((e: any) => e.name))
    const toInsert = rows.filter(r => !existingNames.has(r.name))

    if (toInsert.length === 0) {
      setMsg('Nada para inserir — já está tudo no banco ✅')
      setLoading(false)
      return
    }

    const { error: insErr } = await supabase.from('places').insert(toInsert)

    if (insErr) {
      console.error(insErr)
      setMsg('Erro ao inserir (console). Talvez falte policy de insert/RLS.')
      setLoading(false)
      return
    }

    setMsg(`Seed concluída ✅ Inseridos: ${toInsert.length}`)
    setLoading(false)
  }

  return (
    <main className="container">
      <section className="hero">
        <h1>🌱 Seed — Beto Carrero</h1>
        <p>Clique uma vez para enviar brinquedos + restaurantes para o Supabase.</p>

        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 14 }}>
          <button className="btn btnPrimary" onClick={runSeed} disabled={loading}>
            {loading ? 'Enviando…' : 'Rodar seed agora'}
          </button>
          <span className="badge">{msg || 'Pronto para rodar'}</span>
        </div>
      </section>
    </main>
  )
}
