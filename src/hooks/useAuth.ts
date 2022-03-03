import { User } from 'firebase/auth'
import { atom, useRecoilState } from 'recoil'
import { useCallback } from 'react'
import { signOutAuth } from '@/api/auth'
import { reloadAsync } from 'expo-updates'

const authUserAtom = atom<User | undefined | null>({
  key: 'authUser',
  default: undefined,
})
const accessTokenAtom = atom<string | undefined>({
  key: 'accessToken',
  default: undefined,
})
export const useAuth = () => {
  const [authUser, setAuthUser] = useRecoilState(authUserAtom)
  const [accessToken, setAccessToken] = useRecoilState(accessTokenAtom)

  const logout = useCallback(async () => {
    await signOutAuth()
    reloadAsync()
  }, [])

  return {
    logout,
    authUser,
    setAccessToken,
    accessToken,
    setAuthUser,
  }
}
