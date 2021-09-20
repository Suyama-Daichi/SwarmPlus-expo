import { atom, selector, useRecoilState, useRecoilValue } from 'recoil'
import { Checkin, User } from '@/types/Foursquare'
import { convertAgendaObject } from '@/service/utilFns'

const userAtom = atom<User>({
  key: 'user',
  default: {
    id: '',
    firstName: '',
    lastName: '',
    gender: '',
    countryCode: '',
    relationship: '',
    photo: { prefix: '', suffix: '' },
  },
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

const checkinAgendaSelector = selector({
  key: 'checkins/agenda',
  get: ({ get }) => convertAgendaObject(get(checkinsAtom)),
})

export const useRecoil = () => {
  const [user, setUser] = useRecoilState(userAtom)
  const [checkins, setCheckins] = useRecoilState(checkinsAtom)
  const [fetchHistory, setFetchHistory] = useRecoilState(fetchHistoryAtom)
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
  }
}
