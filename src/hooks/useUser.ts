import { addUser } from '@/api/users'
import { fetchUser } from '@/service/foursquareApi'
import { FoursquareUser } from '@/types/Foursquare'
import { User } from 'firebase/auth'
import { useState } from 'react'
import { atom, useRecoilState } from 'recoil'

const loginUserAtom = atom<FoursquareUser | undefined>({
  key: 'loginUser',
  default: undefined,
})
const authUserAtom = atom<User | undefined>({
  key: 'authUser',
  default: undefined,
})
export const useUser = () => {
  const [loginUser, setUser] = useRecoilState(loginUserAtom)
  const [loading, setLoading] = useState(true)
  const [authUser, setAuthUser] = useRecoilState(authUserAtom)
  const loadFinished = () => setLoading(false)

  /** ユーザーを取得してFirestoreに保存 */
  const fetchSetUser = async () => {
    const user = await fetchUser()
    user && addUser(user)
    user && setUser(user)
    loadFinished()
    return user
  }

  return {
    fetchSetUser,
    setAuthUser,
    loginUser,
    authUser,
    loading,
  }
}
