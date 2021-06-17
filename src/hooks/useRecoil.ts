import { atom, useRecoilState } from 'recoil'
import { User } from '../types/Foursquare'

const userState = atom<User>({
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

const requestState = atom<{ url: string; request: Promise<any> }[]>({
  key: 'request',
  default: [],
})

export const useRecoil = () => {
  const [user, setUser] = useRecoilState(userState)
  const [requestCache, setRequestCache] = useRecoilState(requestState)

  return {
    setUser,
    user,
    requestCache,
    setRequestCache,
  }
}
