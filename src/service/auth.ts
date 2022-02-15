import { auth } from '@/service/firebase'
import { User } from '@firebase/auth'

/** IDトークンを取得する(Claim含む) */
export const getIdToken = async () => {
  const idToken = await auth.currentUser?.getIdTokenResult(true)
  return idToken
}

/**
 * 現在のauthユーザーを取得
 * エラー時は下記Linkのエラー内容が返却される。アラートを出してアプリの再起動を促す想定。
 * @link https://firebase.google.com/docs/reference/js/firebase.auth.Error
 */
export const fetchCurrentAuth = async (): Promise<User | null> => {
  return new Promise((resolve, reject) => {
    auth.onAuthStateChanged(
      (user) => {
        resolve(user)
      },
      (err: Error) => {
        reject(new Error(`${err.name}: ${err.message}`))
      }
    )
  })
}
