import { functions } from '@/service/firebase'
import { httpsCallable } from '@firebase/functions'

/** カスタムトークンを生成する関数定義 */
export const genCustomToken = httpsCallable<{ uid: string }, { customToken: string }>(
  functions,
  'auth-genCustomToken'
)
