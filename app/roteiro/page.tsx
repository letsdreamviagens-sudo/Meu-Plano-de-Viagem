'use client'

import { useEffect, useMemo, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

type Place = {
  id: string
  name: string
  category: string | null
  short_description: string | null
  min_height_cm?: number | null
  queue_level?: string | null
}

type DayPlaceRow = {
  id: string
  period: 'morning' | 'afternoon' | 'night' | null
  notes: string | null
  order_index: number | null
  place: Place
}

type TripDay = {
  id: string
  day_number: number
  date: string | null
}

const PERIOD_LABEL: Record<string, string> = {
  morning: '🌅 Manhã',
  afternoon: '☀️ Tarde',
  night: '🌙 Noite',
}

export default function RoteiroPage() {
  const [tripId, setTripId] = useState<string | null>(null)
  const [days, setDays] = useState<TripDay[]>([])
  const [itemsByDay, setItemsByDay] = useState<Record<string, DayPlaceRow[]>>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const id = typeof window !== 'undefined' ? localStorage.getItem('active_trip_id') : null
    setTripId(id)
  }, [])

  useEffect(() => {
    const load = async () => {
      if (!tripId) {
        setLoading(false)
        return
      }

      setLoading(true)

      const { data: dayData, error: dayErr } = await supabase
        .from('trip_days')
        .select('id, day_number, date')
        .eq('trip_id', tripId)
        .order('day_number', { ascending: true })

      if (dayErr) {
        console.error(dayErr)
        setLoading(false)
        return
      }

      setDays(dayData || [])

      // carrega itens por dia
      const newMap: Record<string, DayPlaceRow[]> = {}
      for (const d of dayData || []) {
        const { data: items, error } = await supabase
          .from('trip_day_places')
          .select('id, period, notes, order_index, place:places(id, name, category, short_description, min_height_cm, queue_level)')
          .eq('trip_day_id', d.id)
          .order('period', { ascending: true })
          .order('order_index', { ascending: true })

        if (error) {
          console.error(error)
          continue
        }

        newMap[d.id] = (items as any) || []
      }

      setItemsByDay(newMap)
      setLoading(false)
    }

    load()
  }, [tripId])

  const hasTrip = useMemo(() => !!tripId, [tripId])

  if (loading) {
    return (
      <main className="container">
        <section className="hero">
          <h1>🗓️ Roteiro</h1>
          <p>Carregando…</p>
        </section>
      </main>
    )
  }

  if (!hasTrip) {
    return (
      <main className="container">
        <section className="hero">
          <h1>🗓️ Roteiro</h1>
          <p>Você ainda não criou uma viagem ativa. Vá em <b>Explorar</b> e clique em “Criar viagem demo”.</p>
        </section>
      </main>
    )
  }

  return (
    <main className="container">
      <section className="hero">
        <h1>🗓️ Roteiro</h1>
        <p>Itens adicionados do “Explorar” aparecem aqui por dia e período.</p>
      </section>

      {days.map((d) => {
        const rows = itemsByDay[d.id] || []

        const grouped = {
          morning: rows.filter(r => r.period === 'morning'),
          afternoon: rows.filter(r => r.period === 'afternoon'),
          night: rows.filter(r => r.period === 'night'),
        }

        return (
          <div key={d.id} style={{ marginTop: 18 }}>
            <div className="badge">Dia {d.day_number}{d.date ? ` • ${d.date}` : ''}</div>

            {(['morning','afternoon','night'] as const).map((p) => (
              <div key={p} style={{ marginTop: 10 }}>
                <div className="sectionTitle">{PERIOD_LABEL[p]}</div>

                {(grouped[p] || []).length === 0 ? (
                  <div className="badge">Nada aqui ainda</div>
                ) : (
                  (grouped[p] || []).map((r) => (
                    <div key={r.id} className="card" style={{ marginTop: 10 }}>
                      <div className="cardBody">
                        <div className="metaRow">
                          <span className="badge">{r.place?.category || 'item'}</span>
                          {r.place?.queue_level && <span className="badge">⏳ {r.place.queue_level}</span>}
                          {r.place?.min_height_cm && <span className="badge">👶 {r.place.min_height_cm}cm+</span>}
                        </div>
                        <h3 className="cardTitle">{r.place?.name}</h3>
                        {r.place?.short_description && <p className="cardDesc">{r.place.short_description}</p>}
                        {r.notes && <p className="cardDesc"><b>Nota:</b> {r.notes}</p>}
                      </div>
                    </div>
                  ))
                )}
              </div>
            ))}
          </div>
        )
      })}
    </main>
  )
}
