'use client'

import { useEffect, useMemo, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'

type Row = {
  id: string
  period: 'morning' | 'afternoon' | 'night'
  notes: string | null
  order_index: number
  trip_day: { day_number: number; date: string | null } | null
  place: { name: string; category: string; short_description: string | null } | null
  trip_day_id?: string
}

const label = (p: Row['period']) => p === 'morning' ? '🌅 Manhã' : p === 'afternoon' ? '☀️ Tarde' : '🌙 Noite'

export default function Roteiro() {
  const [loading, setLoading] = useState(true)
  const [rows, setRows] = useState<Row[]>([])
  const [activeTripId, setActiveTripId] = useState<string | null>(null)

  useEffect(() => {
    setActiveTripId(localStorage.getItem('active_trip_id'))
  }, [])

  useEffect(() => {
    const run = async () => {
      if (!supabase) { setLoading(false); return }
      if (!activeTripId) { setLoading(false); return }

      setLoading(true)

      const { data: days } = await supabase.from('trip_days').select('id').eq('trip_id', activeTripId)
      const dayIds = new Set((days || []).map((d: any) => d.id))

      const { data } = await supabase
        .from('trip_day_places')
        .select(`
          id, period, notes, order_index, trip_day_id,
          trip_day:trip_days(day_number, date),
          place:places(name, category, short_description)
        `)
        .order('order_index', { ascending: true })

      const filtered = (data || []).filter((r: any) => dayIds.has(r.trip_day_id))
      setRows(filtered as any)
      setLoading(false)
    }

    run()
  }, [activeTripId])

  if (!supabase) {
    return (
      <main className="container">
        <section className="hero">
          <h1>🗓️ Roteiro</h1>
          <p>Supabase não configurado na Vercel (variáveis).</p>
        </section>
      </main>
    )
  }

  if (!activeTripId) {
    return (
      <main className="container">
        <section className="hero">
          <h1>🗓️ Roteiro</h1>
          <p>Crie uma viagem demo em /explorar para começar.</p>
        </section>
      </main>
    )
  }

  const grouped = useMemo(() => {
    const g: Record<string, Row[]> = {}
    for (const r of rows) {
      const key = `Dia ${r.trip_day?.day_number ?? '?'} • ${label(r.period)}`
      g[key] = g[key] || []
      g[key].push(r)
    }
    return g
  }, [rows])

  return (
    <main className="container">
      <section className="hero">
        <h1>🗓️ Seu roteiro</h1>
        <p>O que você adicionou aparece organizado por dia e período.</p>
      </section>

      {loading ? (
        <div className="panel"><span className="badge">Carregando…</span></div>
      ) : (
        Object.keys(grouped).length === 0 ? (
          <div className="panel">
            <div style={{ fontWeight: 900 }}>Nada no roteiro ainda.</div>
            <div className="small">Vá em /explorar e clique “Adicionar ao roteiro”.</div>
          </div>
        ) : (
          Object.entries(grouped).map(([k, list]) => (
            <div key={k} className="panel">
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                <div style={{ fontWeight: 900 }}>{k}</div>
                <span className="badge">{list.length} itens</span>
              </div>
              <div className="hr" />
              {list.map((r) => (
                <div key={r.id} className="row">
                  <div>
                    <div style={{ fontWeight: 900 }}>
                      {r.place?.category === 'restaurant' ? '🍽️ ' : '🎢 '}
                      {r.place?.name}
                    </div>
                    <div className="small">{r.place?.short_description || ''}</div>
                    {r.notes ? <div className="small">📝 {r.notes}</div> : null}
                  </div>
                  <span className="badge">{label(r.period)}</span>
                </div>
              ))}
            </div>
          ))
        )
      )}
    </main>
  )
}
