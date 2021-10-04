import { useRecoil } from '@/hooks/useRecoil'
import { getStartEndOfMonth } from '@/service/dateFns'
import { fetchUserCheckins } from '@/service/foursquareApi'
import { useState } from 'react'

export const useCheckinCalendar = () => {
  const [loading, setLoading] = useState(true)
  const { setCheckins, setFetchHistory, fetchHistory } = useRecoil()

  const fetchCheckin = async (date: Date) => {
    setLoading(true)
    const period = getStartEndOfMonth(date)
    const exists = fetchHistory.some((c) => c.valueOf() === date.valueOf())
    setFetchHistory(() => {
      if (fetchHistory.length === 0) return [date]
      return exists ? fetchHistory : [...fetchHistory, date]
    })
    if (exists) {
      setLoading(false)
      return
    }
    const checkins = await fetchUserCheckins(period)
    setCheckins((current) => {
      if (current.length === 0) return checkins
      return [...current, ...checkins.filter((f) => current.some((c) => c.id !== f.id))]
    })
    setLoading(false)
  }

  return { loading, fetchCheckin }
}
