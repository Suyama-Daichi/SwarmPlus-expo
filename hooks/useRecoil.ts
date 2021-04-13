import { atom, selector, useRecoilState } from 'recoil'
import { User } from '../interface/Foursquare.type'

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

export const useRecoil = () => {
  const [user, setUser] = useRecoilState(userState)

  return {
    setUser,
    user,
  }
}
