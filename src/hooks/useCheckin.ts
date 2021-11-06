import { getStartEndOfMonth } from '@/service/dateFns'
import { fetchUserCheckins } from '@/service/foursquareApi'

export const useCheckin = () => {
  const fetchCheckin = async (date: Date) => {
    const period = getStartEndOfMonth(date)
    const checkins = await fetchUserCheckins({ period })
    return checkins
  }

  return { fetchCheckin }
}
