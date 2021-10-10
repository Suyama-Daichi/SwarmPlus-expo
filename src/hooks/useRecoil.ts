import { atom, selector, useRecoilState, useRecoilValue } from 'recoil'
import { Checkin, User } from '@/types/Foursquare'
import { convertAgendaObject } from '@/service/utilFns'

const userAtom = atom<User | undefined>({
  key: 'user',
  default: undefined,
})

const requestAtom = atom<{ url: string; request: Promise<any> }[]>({
  key: 'request',
  default: [],
})

const checkinsAtom = atom<Checkin[]>({
  key: 'checkins',
  default: [],
})

const fetchHistoryAtom = atom<Date[]>({
  key: 'fetchHistory',
  default: [],
})

const selectedDateOnMapAtom = atom<Date | undefined>({
  key: 'selectedDateOnMap',
  default: undefined,
})

const checkinAgendaSelector = selector({
  key: 'checkins/agenda',
  get: ({ get }) => convertAgendaObject(get(checkinsAtom)),
})

export const useRecoil = () => {
  const [user, setUser] = useRecoilState(userAtom)
  const [checkins, setCheckins] = useRecoilState(checkinsAtom)
  const [fetchHistory, setFetchHistory] = useRecoilState(fetchHistoryAtom)
  const [selectedDateOnMap, setSelectedDateOnMap] = useRecoilState(selectedDateOnMapAtom)
  const [requestCache, setRequestCache] = useRecoilState(requestAtom)
  const checkinAgenda = useRecoilValue(checkinAgendaSelector)

  return {
    setUser,
    user,
    requestCache,
    setRequestCache,
    checkins,
    setCheckins,
    checkinAgenda,
    fetchHistory,
    setFetchHistory,
    selectedDateOnMap,
    setSelectedDateOnMap,
  }
}
