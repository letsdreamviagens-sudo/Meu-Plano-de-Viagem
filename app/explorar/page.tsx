'use client'

import { useEffect, useState } from 'react'
import Card from '../../components/Card'
import { supabase } from '../../lib/supabaseClient'

type Place = {
  id: string
  name: string
  category: 'attraction' | 'restaurant'
  short_description: string | null
  image_url: string | null
  youtube_url: string | null
  queue_level: 'baixa' | 'média' | 'alta' | null
  min_height_cm: number | null
}

export default function ExplorarPage() {
  const [loading, setLoading] = useState(true)
  const [places, setPlaces] = useState<Place[]>([])
  const [activeTripId, setActiveTripId] = useState<string | null>(null)

  useEffect(() => {
    setActiveTripId(localStorage.getItem('active_trip_id'))
  }, [])

  useEffect(() => {
    loadPlaces()
  }, [])

  const loadPlaces = async () => {
    if (!supabase) return
    setLoading(true)
    const { data } = await supabase
      .from('places')
      .select('*')
      .order('created_at', { ascending: false })
    setPlaces((data || []) as Place[])
    setLoading(false)
  }

  const createDemoTrip = async () => {
    if (!supabase) {
      alert('Supabase não configurado')
      return
    }

    const res = await supabase
      .from('trips')
      .insert([
        {
          trip_name: 'Beto Carrero (demo)',
          destination: 'Penha – SC',
          start_date: '2026-03-12',
          end_date: '2026-03-14',
          user_id: null
        }
      ])
      .select('id')
      .maybeSingle()

    if (res.error) {
      console.error(res.error)
      alert(`Erro criando viagem: ${res.error.message}`)
      return
    }

    const tripId = res.data?.id
    if (!tripId) {
      alert('Viagem criada sem ID')
      return
    }

    const daysRes = await supabase.from('trip_days').insert([
      { trip_id: tripId, day_number: 1, date: '2026-03-12' },
      { trip_id: tripId, day_number: 2, date: '2026-03-13' },
      { trip_id: tripId, day_number: 3, date: '2026-03-14' }
    ])

    if (daysRes.error) {
      console.error(daysRes.error)
      alert(`Erro criando dias: ${daysRes.error.message}`)
      return
    }

    localStorage.setItem('active_trip_id', tripId)
    setActiveTripId(tripId)
    alert('Viagem demo criada ✅')
  }

  const addToRoteiro = async (placeId: string) => {
    if (!supabase) return
    if (!activeTripId) {
      alert('Crie uma viagem demo primeiro')
      return
    }

    const { data: days } = await supabase
      .from('trip_days')
      .select('id')
      .eq('trip_id', activeTripId)
      .order('day_number', { ascending: true })
      .limit(1)

    const dayId = days?.[0]?.id
    if (!dayId) return

    await supabase.from('trip_day_places').insert([
      {
        trip_day_id: dayId,
        place_id: placeId,
        period: 'morning',
        order_index: 0
      }
    ])

    alert('Adicionado ao roteiro ✅')
  }

  return (
    <main className="container">
      <section className="hero">
        <h1>🎢 Explorar Beto Carrero</h1>
        <p>Brinquedos e restaurantes — tudo pode entrar no seu roteiro.</p>

        <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
          {!activeTripId ? (
            <button className="btn btnPrimary" onClick={createDemoTrip}>
              ✨ Criar viagem demo
            </button>
          ) : (
            <span className="badge">Viagem ativa</span>
          )}
          <button className="btn" onClick={loadPlaces}>🔄 Recarregar</button>
        </div>
      </section>

      {loading ? (
        <div className="panel"><span className="badge">Carregando…</span></div>
      ) : (
        <div className="grid">
          {places.map((p) => (
            <Card
              key={p.id}
              title={p.name}
              description={p.short_description || ''}
              image={p.image_url}
              link={p.youtube_url || undefined}
              tags={[
                p.category === 'restaurant' ? '🍽️ Restaurante' : '🎢 Brinquedo',
                p.queue_level ? `⏳ fila ${p.queue_level}` : '',
                p.min_height_cm ? `👶 ${p.min_height_cm}cm+` : ''
              ]}
              onAdd={() => addToRoteiro(p.id)}
            />
          ))}
        </div>
      )}
    </main>
  )
}
