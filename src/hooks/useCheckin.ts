import { getStartEndOfMonth } from '@/service/dateFns'
import { fetchUserCheckins } from '@/service/foursquareApi'
import { Checkin } from '@/types/Foursquare'
import { atom, useRecoilState } from 'recoil'
import { addCheckins } from '@/api/checkins'
import { useUser } from '@/hooks/useUser'

const checkinsAtom = atom<Checkin[]>({
  key: 'checkins',
  default: [],
})

export const useCheckin = () => {
  const { loginUser } = useUser()
  const [checkins, setCheckins] = useRecoilState(checkinsAtom)

  const fetchCheckin = async (date: Date) => {
    const period = getStartEndOfMonth(date)
    const checkins = await fetchUserCheckins({ period })
    setCheckins((current) => (current ? [...current, ...checkins] : checkins))
    loginUser && addCheckins(loginUser.id, checkins)
    return checkins
  }

  return { fetchCheckin, checkins, setCheckins }
}
