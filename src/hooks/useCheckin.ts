import { getStartEndOfMonth } from '@/service/dateFns'
import { fetchVenuesByLocation, fetchUserCheckins } from '@/service/foursquareApi'
import { Checkin } from '@/types/Foursquare'
import { atom, useRecoilState } from 'recoil'
import { addCheckins, fetchCheckinsFromFirestore } from '@/api/checkins'
import { useUser } from '@/hooks/useUser'
import { unionArray } from '@/service/utilFns'
import { Region } from 'react-native-maps'

const checkinsAtom = atom<Checkin[]>({
  key: 'checkins',
  default: [],
})

export const useCheckin = () => {
  const { loginUser } = useUser()
  const [checkins, setCheckins] = useRecoilState(checkinsAtom)

  const fetchCheckinsByDateSoft = async (date: Date) => {
    const period = getStartEndOfMonth(date)
    if (!loginUser) return
    const checkinsInFirestore = await fetchCheckinsFromFirestore(loginUser.id, period)
    const checkins = !checkinsInFirestore.length
      ? await fetchUserCheckins({ period })
      : checkinsInFirestore
    setCheckins((current) => unionArray(current ? [...current, ...checkins] : checkins, 'id'))
    loginUser && addCheckins(loginUser.id, checkins)
    return checkins
  }

  const fetchCheckinsByDateHard = async (date: Date) => {
    const period = getStartEndOfMonth(date)
    const checkins = await fetchUserCheckins({ period })

    setCheckins((current) => unionArray(current ? [...current, ...checkins] : checkins, 'id'))

    loginUser && addCheckins(loginUser.id, checkins)
    return checkins
  }

  const fetchCheckinsByLocation = async (location: Region) => {
    const { latitude, longitude } = location
    const res = await fetchVenuesByLocation({ latitude, longitude })
    console.log(res)
  }

  return {
    fetchCheckinsByDateSoft,
    fetchCheckinsByDateHard,
    checkins,
    setCheckins,
    fetchCheckinsByLocation,
  }
}
