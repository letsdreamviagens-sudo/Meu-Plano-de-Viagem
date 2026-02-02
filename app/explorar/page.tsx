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

export default function Explorar() {
  const [loading, setLoading] = useState(true)
  const [places, setPlaces] = useState<Place[]>([])
  const [activeTripId, setActiveTripId] = useState<string | null>(null)

  useEffect(() => {
    setActiveTripId(localStorage.getItem('active_trip_id'))
  }, [])

  const load = async () => {
    if (!supabase) return
    setLoading(true)
    const { data } = await supabase.from('places').select('*').order('created_at', { ascending: false })
    setPlaces((data || []) as any)
    setLoading(false)
  }

  useEffect(() => {
    load()
  }, [])

  const createDemoTrip = async () => {
    if (!supabase) return alert('Supabase não configurado.')
    const { data: trip, error } = await supabase
      .from('trips')
      .insert([{ trip_name: 'Beto Carrero (demo)', destination: 'Penha – SC', start_date: '2026-03-12', end_date: '2026-03-14', user_id: null }])
      .select('id')
      .single()

    if (error) return alert('Erro criando viagem.')

    const tripId = trip.id as string
    await supabase.from('trip_days').insert([
      { trip_id: tripId, day_number: 1, date: '2026-03-12' },
      { trip_id: tripId, day_number: 2, date: '2026-03-13' },
      { trip_id: tripId, day_number: 3, date: '2026-03-14' }
    ])

    localStorage.setItem('active_trip_id', tripId)
    setActiveTripId(tripId)
    alert('Viagem demo criada ✅ Agora vá adicionando itens no roteiro.')
  }

  const addToRoteiro = async (placeId: string) => {
    if (!supabase) return alert('Supabase não configurado.')
    if (!activeTripId) return alert('Crie uma viagem demo primeiro.')

    const { data: days } = await supabase
      .from('trip_days')
      .select('id')
      .eq('trip_id', activeTripId)
      .order('day_number', { ascending: true })
      .limit(1)

    const dayId = (days?.[0]?.id as string) || null
    if (!dayId) return alert('Sem dias na viagem.')

    const { data: last } = await supabase
      .from('trip_day_places')
      .select('order_index')
      .eq('trip_day_id', dayId)
      .eq('period', 'morning')
      .order('order_index', { ascending: false })
      .limit(1)

    const nextIndex = ((last?.[0]?.order_index ?? -1) as number) + 1

    const { error } = await supabase.from('trip_day_places').insert([{
      trip_day_id: dayId,
      place_id: placeId,
      period: 'morning',
      notes: null,
      order_index: nextIndex
    }])

    if (error) return alert('Erro ao adicionar.')
    alert('Adicionado ao roteiro ✅ (Manhã do Dia 1). Depois vamos escolher período/dia.')
  }

  return (
    <main className="container">
      <section className="hero">
        <h1>🎢 Explorar Beto Carrero</h1>
        <p>Brinquedos e restaurantes — tudo pode entrar no seu roteiro.</p>

        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 14 }}>
          {!activeTripId ? (
            <button className="btn btnPrimary" onClick={createDemoTrip}>✨ Criar viagem demo</button>
          ) : (
            <span className="badge">Viagem ativa ✅</span>
          )}
          <button className="btn" onClick={load}>🔄 Recarregar</button>
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
