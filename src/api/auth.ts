import { genCustomToken } from '@/service/functions'
import { auth } from '@/service/firebase'
import { signInWithCustomToken as firebaseSignin, signOut as SO, User } from 'firebase/auth'

export const signInWithCustomToken = async (token: string) => {
  const userCredential = await firebaseSignin(auth, token).catch((e) => {
    throw new Error(e)
  })
  return userCredential
}

/** カスタムトークンを取得 */
export const getCustomToken = async (uid: string, accessToken: string) => {
  const customToken = await genCustomToken({ uid: uid, accessToken })
  return customToken
}

/**
 * ログアウト(Firebaseサインアウト)
 */
export const signOutAuth = async () => {
  return await auth
    .signOut()
    .then(() => true)
    .catch((e) => {
      console.log('error')
    })
}
/**
 * 現在のauthユーザーを取得
 * エラー時は下記Linkのエラー内容が返却される。アラートを出してアプリの再起動を促す想定。
 * @link https://firebase.google.com/docs/reference/js/firebase.auth.Error
 */
export const fetchCurrentAuth = async (): Promise<User> => {
  if (!auth.currentUser) new Error('未ログインです')
  return new Promise((resolve, reject) => {
    auth.onAuthStateChanged(
      (user) => {
        const copy = JSON.parse(JSON.stringify(user)) as User
        resolve(copy)
      },
      (err) => {
        reject(new Error(`未ログインです`))
      }
    )
  })
}
