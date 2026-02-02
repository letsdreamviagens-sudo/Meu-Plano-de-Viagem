const { data: trip, error } = await supabase
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

if (error) {
  console.error(error)
  alert(`Erro criando viagem: ${error.message}`)
  return
}

const tripId = trip?.id
if (!tripId) {
  alert('Não retornou id da viagem (ver console).')
  return
}
