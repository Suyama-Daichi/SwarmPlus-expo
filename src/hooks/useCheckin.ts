import { getStartEndOfMonth } from '@/service/dateFns'
import { fetchUserCheckins } from '@/service/foursquareApi'
import { Checkin } from '@/types/Foursquare'
import { atom, useRecoilState } from 'recoil'
import { addCheckins, fetchCheckinsFromFirestore } from '@/api/checkins'
import { useUser } from '@/hooks/useUser'
import { unionArray } from '@/service/utilFns'

const checkinsAtom = atom<Checkin[]>({
  key: 'checkins',
  default: [],
})

export const useCheckin = () => {
  const { foursquareUser } = useUser()
  const [checkins, setCheckins] = useRecoilState(checkinsAtom)

  const fetchCheckinsSoft = async (date: Date) => {
    const period = getStartEndOfMonth(date)
    if (!foursquareUser) return
    const checkinsInFirestore = await fetchCheckinsFromFirestore(foursquareUser.id, period)
    const checkins = !checkinsInFirestore.length
      ? await fetchUserCheckins({ period })
      : checkinsInFirestore
    setCheckins((current) => unionArray(current ? [...current, ...checkins] : checkins, 'id'))
    foursquareUser && addCheckins(foursquareUser.id, checkins)
    return checkins
  }

  const fetchCheckinsHard = async (date: Date) => {
    const period = getStartEndOfMonth(date)
    const checkins = await fetchUserCheckins({ period })

    setCheckins((current) => unionArray(current ? [...current, ...checkins] : checkins, 'id'))

    foursquareUser && addCheckins(foursquareUser.id, checkins)
    return checkins
  }

  return { fetchCheckinsSoft, fetchCheckinsHard, checkins, setCheckins }
}
