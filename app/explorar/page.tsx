'use client'

import { useEffect, useMemo, useState } from 'react'
import Card from '../../components/Card'
import { supabase } from '../../lib/supabaseClient'

type SeedPlace = {
  name: string
  category: 'attraction' | 'restaurant' | 'hotel' | 'place'
  short_description: string
  image_url: string
  youtube_url?: string
  queue_level?: 'baixa' | 'média' | 'alta'
  min_height_cm?: number
}

const SEED: SeedPlace[] = [
  {
    name: 'FireWhip',
    category: 'attraction',
    short_description: 'Montanha-russa invertida radical no Beto Carrero.',
    image_url:
      'https://images.unsplash.com/photo-1505852679233-d9fd70aff56d?auto=format&fit=crop&w=1200&q=80',
    youtube_url:
      'https://www.youtube.com/results?search_query=firewhip+beto+carrero',
    queue_level: 'alta',
    min_height_cm: 130,
  },
  {
    name: 'Big Tower',
    category: 'attraction',
    short_description: 'Queda livre com vista do parque inteiro.',
    image_url:
      'https://images.unsplash.com/photo-1511884642898-4c92249e20b6?auto=format&fit=crop&w=1200&q=80',
    youtube_url:
      'https://www.youtube.com/results?search_query=big+tower+beto+carrero',
    queue_level: 'média',
    min_height_cm: 120,
  },
  {
    name: 'Almoço família (sugestão)',
    category: 'restaurant',
    short_description: 'Opção prática para pausa entre brinquedos.',
    image_url:
      'https://images.unsplash.com/photo-1555992336-03a23c7b20ee?auto=format&fit=crop&w=1200&q=80',
  },
]

const PERIODS = [
  { value: 'morning', label: '🌅 Manhã' },
  { value: 'afternoon', label: '☀️ Tarde' },
  { value: 'night', label: '🌙 Noite' },
] as const

export default function Explorar() {
  const [loading, setLoading] = useState(true)
  const [places, setPlaces] = useState<any[]>([])
  const [activeTripId, setActiveTripId] = useState<string | null>(null)

  const [tripDays, setTripDays] = useState<
    { id: string; day_number: number; date: string | null }[]
  >([])

  // modal
  const [addingPlaceId, setAddingPlaceId] = useState<string | null>(null)
  const [dayId, setDayId] = useState<string>('')
  const [period, setPeriod] =
    useState<(typeof PERIODS)[number]['value']>('morning')
  const [note, setNote] = useState('')

  useEffect(() => {
    const id = localStorage.getItem('active_trip_id')
    setActiveTripId(id)
  }, [])

  useEffect(() => {
    const seedAndLoad = async () => {
      setLoading(true)

      for (const s of SEED) {
        const { data: existing } = await supabase
          .from('places')
          .select('id')
          .eq('name', s.name)
          .limit(1)

        if (!existing || existing.length === 0) {
          await supabase.from('places').insert([
            {
              name: s.name,
              category: s.category,
              short_description: s.short_description,
              image_url: s.image_url,
              youtube_url: s.youtube_url ?? null,
              queue_level: s.queue_level ?? null,
              min_height_cm: s.min_height_cm ?? null,
              city: 'Penha',
              is_kid_friendly: true,
            },
          ])
        }
      }

      const { data } = await supabase
        .from('places')
        .select('*')
        .order('created_at', { ascending: false })

      setPlaces(data || [])
      setLoading(false)
    }

    seedAndLoad()
  }, [])

  useEffect(() => {
    const loadDays = async () => {
      if (!activeTripId) {
        setTripDays([])
        setDayId('')
        return
      }

      const { data } = await supabase
        .from('trip_days')
        .select('id, day_number, date')
        .eq('trip_id', activeTripId)
        .order('day_number', { ascending: true })

      setTripDays(data || [])
      setDayId((data && data[0]?.id) || '')
    }

    loadDays()
  }, [activeTripId])

  const hasTrip = useMemo(() => !!activeTripId, [activeTripId])

  const createDemoTrip = async () => {
    const { data: trip, error: tripErr } = await supabase
      .from('trips')
      .insert([
        {
          trip_name: 'Beto Carrero (demo)',
          destination: 'Penha – SC',
          start_date: '2026-03-12',
          end_date: '2026-03-14',
          user_id: null,
        },
      ])
      .select('id')
      .single()

    if (tripErr) {
      console.error(tripErr)
      alert('Erro criando viagem. Veja o console.')
      return
    }

    const tripId = trip.id as string

    await supabase.from('trip_days').insert([
      { trip_id: tripId, day_number: 1, date: '2026-03-12' },
      { trip_id: tripId, day_number: 2, date: '2026-03-13' },
      { trip_id: tripId, day_number: 3, date: '2026-03-14' },
    ])

    localStorage.setItem('active_trip_id', tripId)
    setActiveTripId(tripId)
    alert('Viagem demo criada ✅ Agora já dá pra adicionar itens ao roteiro.')
  }

  const openAdd = (placeId: string) => {
    if (!activeTripId) {
      alert('Crie uma viagem demo primeiro 🙂')
      return
    }
    setAddingPlaceId(placeId)
    setNote('')
    setPeriod('morning')
    setDayId(tripDays[0]?.id || '')
  }

  const confirmAdd = async () => {
    if (!addingPlaceId) return
    if (!dayId) {
      alert('Selecione um dia.')
      return
    }

    const { data: existing } = await supabase
      .from('trip_day_places')
      .select('order_index')
      .eq('trip_day_id', dayId)
      .eq('period', period)
      .order('order_index', { ascending: false })
      .limit(1)

    const nextIndex = ((existing?.[0]?.order_index ?? -1) as number) + 1

    const { error } = await supabase.from('trip_day_places').insert([
      {
        trip_day_id: dayId,
        place_id: addingPlaceId,
        period,
        notes: note || null,
        order_index: nextIndex,
      },
    ])

    if (error) {
      console.error(error)
      alert('Erro ao adicionar. Veja o console.')
      return
    }

    setAddingPlaceId(null)
    alert('Adicionado ao roteiro ✅ (veja em /roteiro)')
  }

  return (
    <main className="container">
      <section className="hero">
        <h1>🎢 Explorar destino</h1>
        <p>Escolha itens e adicione ao roteiro por dia e período.</p>

        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 14 }}>
          {!hasTrip ? (
            <button className="btn btnPrimary" onClick={createDemoTrip}>
              ✨ Criar viagem demo (Beto Carrero)
            </button>
          ) : (
            <span className="badge">Viagem ativa: OK ✅</span>
          )}
        </div>
      </section>

      {loading ? (
        <div style={{ marginTop: 18 }} className="badge">
          Carregando…
        </div>
      ) : (
        <div className="grid">
  {places.map((p) => (
    <Card
      key={p.id}
      title={p.name}
      description={p.short_description || ''}
      image={p.image_url}
      link={p.youtube_url || undefined}
      onAdd={() => openAdd(p.id)}
    />
  ))}
</div>
      {addingPlaceId && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,.35)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 14,
            zIndex: 50,
          }}
          onClick={() => setAddingPlaceId(null)}
        >
          <div
            className="card"
            style={{ width: '100%', maxWidth: 520 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="cardBody">
              <h3 className="cardTitle">Adicionar ao roteiro</h3>
              <p className="cardDesc">Escolha o dia e o período.</p>

              <div style={{ display: 'grid', gap: 10 }}>
                <div>
                  <div className="badge" style={{ marginBottom: 6 }}>
                    Dia
                  </div>
                  <select
                    className="btn"
                    style={{ width: '100%', justifyContent: 'space-between' }}
                    value={dayId}
                    onChange={(e) => setDayId(e.target.value)}
                  >
                    {tripDays.map((d) => (
                      <option key={d.id} value={d.id}>
                        Dia {d.day_number}
                        {d.date ? ` • ${d.date}` : ''}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <div className="badge" style={{ marginBottom: 6 }}>
                    Período
                  </div>
                  <select
                    className="btn"
                    style={{ width: '100%', justifyContent: 'space-between' }}
                    value={period}
                    onChange={(e) => setPeriod(e.target.value as any)}
                  >
                    {PERIODS.map((p) => (
                      <option key={p.value} value={p.value}>
                        {p.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <div className="badge" style={{ marginBottom: 6 }}>
                    Nota (opcional)
                  </div>
                  <input
                    className="btn"
                    style={{ width: '100%', justifyContent: 'flex-start' }}
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Ex: ir logo na abertura"
                  />
                </div>
              </div>

              <div
                style={{
                  display: 'flex',
                  gap: 10,
                  justifyContent: 'flex-end',
                  marginTop: 14,
                }}
              >
                <button className="btn" onClick={() => setAddingPlaceId(null)}>
                  Cancelar
                </button>
                <button className="btn btnPrimary" onClick={confirmAdd}>
                  Salvar ✅
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

