import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function POST() {
  const { data: trip, error } = await supabase
    .from('trips')
    .insert({
      trip_name: 'Beto Carrero (demo)',
      destination: 'Penha – SC',
      start_date: '2026-03-12',
      end_date: '2026-03-14',
      user_id: null,
    })
    .select('id')
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const tripId = trip.id

  const { error: daysError } = await supabase.from('trip_days').insert([
    { trip_id: tripId, day_number: 1, date: '2026-03-12' },
    { trip_id: tripId, day_number: 2, date: '2026-03-13' },
    { trip_id: tripId, day_number: 3, date: '2026-03-14' },
  ])

  if (daysError) {
    return NextResponse.json({ error: daysError.message }, { status: 500 })
  }

  return NextResponse.json({ tripId })
}
