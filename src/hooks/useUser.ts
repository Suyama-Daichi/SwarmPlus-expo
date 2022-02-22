import { addUser } from '@/api/users'
import { fetchUser } from '@/service/foursquareApi'
import { FoursquareUser } from '@/types/Foursquare'
import { User } from 'firebase/auth'
import { useCallback, useState } from 'react'
import { atom, useRecoilState } from 'recoil'

const foursquareUserAtom = atom<FoursquareUser | undefined>({
  key: 'foursquareUser',
  default: undefined,
})
const authUserAtom = atom<User | undefined>({
  key: 'authUser',
  default: undefined,
})

export const useUser = () => {
  const [foursquareUser, setFoursquareUser] = useRecoilState(foursquareUserAtom)
  const [loading, setLoading] = useState(true)
  const [authUser, setAuthUser] = useRecoilState(authUserAtom)
  const loadFinished = () => setLoading(false)

  /** ユーザーを取得してFirestoreに保存 */
  const fetchSetUser = useCallback(async () => {
    const user = await fetchUser()
    user && addUser(user) // Firestoreに保存
    user && setFoursquareUser(user)
    loadFinished()
    return user
  }, [])

  return {
    fetchSetUser,
    setAuthUser,
    foursquareUser,
    authUser,
    loading,
  }
}
