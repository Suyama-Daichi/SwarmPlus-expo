import { addUser } from '@/api/users'
import { auth } from '@/service/firebase'
import { fetchUser } from '@/service/foursquareApi'
import { FoursquareUser } from '@/types/Foursquare'
import { User } from 'firebase/auth'
import { useCallback, useState } from 'react'
import { atom, useRecoilState } from 'recoil'

const foursquareUserAtom = atom<FoursquareUser | undefined>({
  key: 'foursquareUser',
  default: undefined,
})
const authUserAtom = atom<User | undefined | null>({
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

  /**
   * 現在のauthユーザーを取得
   * エラー時は下記Linkのエラー内容が返却される。アラートを出してアプリの再起動を促す想定。
   * @link https://firebase.google.com/docs/reference/js/firebase.auth.Error
   */
  const fetchSetCurrentAuth = async (): Promise<User | null> => {
    return new Promise((resolve, reject) => {
      auth.onAuthStateChanged(
        (user) => {
          if (!user) return
          setAuthUser({ ...user })
          resolve(user)
        },
        (err: Error) => {
          reject(new Error(`${err.name}: ${err.message}`))
        }
      )
    })
  }

  return {
    fetchSetUser,
    fetchSetCurrentAuth,
    foursquareUser,
    authUser,
    loading,
  }
}
