const createDemoTrip = async () => {
  if (!supabase) {
    alert('Supabase não configurado.')
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
    console.error('Erro criando viagem:', res.error)
    alert(`Erro criando viagem: ${res.error.message}`)
    return
  }

  const tripId = res.data?.id
  if (!tripId) {
    console.log('Resposta trips:', res)
    alert('Não retornou id da viagem (ver console).')
    return
  }

  const daysRes = await supabase.from('trip_days').insert([
    { trip_id: tripId, day_number: 1, date: '2026-03-12' },
    { trip_id: tripId, day_number: 2, date: '2026-03-13' },
    { trip_id: tripId, day_number: 3, date: '2026-03-14' }
  ])

  if (daysRes.error) {
    console.error('Erro criando dias:', daysRes.error)
    alert(`Erro criando dias: ${daysRes.error.message}`)
    return
  }

  localStorage.setItem('active_trip_id', tripId)
  setActiveTripId(tripId)
  alert('Viagem demo criada ✅ Agora vá adicionando itens no roteiro.')
}
