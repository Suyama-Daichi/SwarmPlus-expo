import { atom, selector, useRecoilState } from 'recoil'

const userState = atom({
  key: 'user',
  default: undefined,
})

export const useRecoil = () => {
  const [user, setUser] = useRecoilState(userState)

  return {
    setUser,
    user,
  }
}
