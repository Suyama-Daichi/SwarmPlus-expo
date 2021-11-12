import { addUser } from '@/api/users'
import { fetchUser } from '@/service/foursquareApi'
import { User } from '@/types/Foursquare'
import { useState } from 'react'
import { atom, useRecoilState } from 'recoil'

const userAtom = atom<User | undefined>({
  key: 'user',
  default: undefined,
})

export const useUser = () => {
  const [loginUser, setUser] = useRecoilState(userAtom)
  const [loading, setLoading] = useState(true)

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
    loginUser,
    loading,
  }
}
