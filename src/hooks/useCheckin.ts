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
  const { loginUser } = useUser()
  const [checkins, setCheckins] = useRecoilState(checkinsAtom)

  const fetchCheckin = async (date: Date) => {
    const period = getStartEndOfMonth(date)
    const checkinsInFirestore = await fetchCheckinsFromFirestore(loginUser?.id, period)
    const checkins = !checkinsInFirestore.length
      ? await fetchUserCheckins({ period })
      : checkinsInFirestore
    setCheckins((current) => unionArray(current ? [...current, ...checkins] : checkins, 'id'))
    loginUser && addCheckins(loginUser.id, checkins)
    return checkins
  }

  const fetchCheckinsHard = async (date: Date) => {
    const period = getStartEndOfMonth(date)
    const checkins = await fetchUserCheckins({ period })

    setCheckins((current) => unionArray(current ? [...current, ...checkins] : checkins, 'id'))

    loginUser && addCheckins(loginUser.id, checkins)
    return checkins
  }

  return { fetchCheckin, fetchCheckinsHard, checkins, setCheckins }
}
