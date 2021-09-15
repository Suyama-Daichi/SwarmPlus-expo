import { useFoursquare } from '@/hooks/useFoursquare'
import { useRecoil } from '@/hooks/useRecoil'
import { getStartEndOfMonth } from '@/service/dateFns'
import { generateImageUrl } from '@/service/utilFns'
import { useState, useEffect } from 'react'

export const useCheckinCalendar = () => {
  const { fetchUserCheckins, fetchUser } = useFoursquare()
  const [loading, setLoading] = useState(true)
  const { setUser, setCheckins, setFetchHistory, fetchHistory } = useRecoil()
  const [userProfURL, setUserProfURL] = useState<string>()

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
      if (current.length === 0) return checkins.items
      return [...current, ...checkins.items.filter((f) => current.some((c) => c.id !== f.id))]
    })
    setLoading(false)
  }

  const fetchSetData = async () => {
    const user = await fetchUser()
    setUser(user)
    const uri = generateImageUrl(user.photo.prefix, user.photo.suffix, 24)
    setUserProfURL(uri)
    await fetchCheckin(new Date())
  }

  useEffect(() => {
    void fetchSetData()
  }, [])

  return { loading, userProfURL, fetchCheckin }
}
