import { getStartEndOfMonth } from '@/service/dateFns'
import { fetchUserCheckins } from '@/service/foursquareApi'
import { convertAgendaObject } from '@/service/utilFns'
import { Checkin } from '@/types/Foursquare'
import { atom, selector, useRecoilValue, useRecoilState } from 'recoil'

const checkinsAtom = atom<Checkin[]>({
  key: 'checkins',
  default: [],
})

export const useCheckin = () => {
  const [checkins, setCheckins] = useRecoilState(checkinsAtom)

  const fetchCheckin = async (date: Date) => {
    const period = getStartEndOfMonth(date)
    const checkins = await fetchUserCheckins({ period })
    setCheckins((current) => (current ? [...current, ...checkins] : checkins))
    return checkins
  }

  return { fetchCheckin, checkins, setCheckins }
}
