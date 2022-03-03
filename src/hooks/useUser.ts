import { addUser } from '@/api/users'
import { fetchUser } from '@/service/foursquareApi'
import { FoursquareUser } from '@/types/Foursquare'
import { useCallback, useEffect, useState } from 'react'
import { atom, useRecoilState } from 'recoil'
import { useAuth } from '@/hooks/useAuth'

const foursquareUserAtom = atom<FoursquareUser | undefined>({
  key: 'foursquareUser',
  default: undefined,
})

export const useUser = () => {
  const [foursquareUser, setFoursquareUser] = useRecoilState(foursquareUserAtom)
  const { authUser, accessToken } = useAuth()
  const [loading, setLoading] = useState(true)
  const loadFinished = () => setLoading(false)

  /** ユーザーを取得してFirestoreに保存 */
  const fetchSetUser = useCallback(async () => {
    if (!accessToken) return
    const user = await fetchUser(accessToken)
    user && addUser(user) // Firestoreに保存
    user && setFoursquareUser(user)
    loadFinished()
    return user
  }, [accessToken, setFoursquareUser])

  useEffect(() => {
    fetchSetUser()
  }, [fetchSetUser])

  return {
    fetchSetUser,
    foursquareUser,
    loading,
  }
}
