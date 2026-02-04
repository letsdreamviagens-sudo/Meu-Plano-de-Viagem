'use client'

import { useState } from 'react'
import { supabase } from '../../../lib/supabaseClient'
import { BETO_CARRERO_ITEMS } from '../../../data/beto-carrero'

export default function SeedPage() {
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState('')

  const runSeed = async () => {
    if (!supabase) {
      setMsg('Supabase não configurado.')
      return
    }

    setLoading(true)
    setMsg('Preparando…')

    const rows = BETO_CARRERO_ITEMS.map((i: any) => ({
      name: i.name,
      category: i.category,
      short_description: i.short_description,
      image_url: null,
      youtube_url: i.youtube_url || null,

      city: 'Penha',
      location_area: i.area || null,
      is_kid_friendly: i.profile !== 'radical',

      min_height_cm: i.min_height_cm ?? null,
      thrill_level: i.profile || null,
      queue_level: i.queue_level || null
    }))

    // ✅ evita URL gigante do `.in(...)`
    const { data: existing, error: selErr } = await supabase
      .from('places')
      .select('name')
      .eq('city', 'Penha')

    if (selErr) {
      console.error(selErr)
      setMsg(`Erro ao buscar existentes: ${selErr.message}`)
      setLoading(false)
      return
    }

    const setNames = new Set((existing || []).map((e: any) => e.name))
    const toInsert = rows.filter((r: any) => !setNames.has(r.name))

    if (toInsert.length === 0) {
      setMsg('Já está tudo no banco ✅')
      setLoading(false)
      return
    }

    const { error: insErr } = await supabase.from('places').insert(toInsert)

    if (insErr) {
      console.error(insErr)
      setMsg(`Erro ao inserir: ${insErr.message}`)
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
        <p>Um clique para enviar brinquedos + restaurantes para o Supabase.</p>

        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 14 }}>
          <button className="btn btnPrimary" onClick={runSeed} disabled={loading}>
            {loading ? 'Enviando…' : 'Rodar seed agora'}
          </button>
          <span className="badge">{msg || 'Pronto'}</span>
        </div>

        <div className="panel">
          <div style={{ fontWeight: 900 }}>Se der erro de permissão:</div>
          <div className="small">
            No Supabase, libere INSERT/SELECT (RLS) para a tabela <b>places</b>.
          </div>
        </div>
      </section>
    </main>
  )
}
