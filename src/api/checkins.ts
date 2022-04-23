import { CHECKINS, USERS } from '@/constants/CollectionName'
import { firestore } from '@/service/firebase'
import { Checkin } from '@/types/Foursquare'
import { IStartEnd as IPeriod } from '@/types/type'
import { GET } from '@/service/firestoreFns'
const usersRef = firestore.collection(USERS)

export const addCheckins = (id: string, checkins: Checkin[]) => {
  const batch = firestore.batch()
  checkins.forEach((checkin) => {
    const checkinRef = usersRef.doc(id).collection(CHECKINS).doc(checkin.id)
    batch.set(checkinRef, checkin)
  })

  batch.commit()
}

/** Firestoreからチェックインの配列を取得 */
export const fetchCheckinsFromFirestore = async (uid: string, period: IPeriod) => {
  const query = usersRef
    .doc(uid)
    .collection(CHECKINS)
    .where('createdAt', '>=', period.afterTimestamp)
    .where('createdAt', '<=', period.beforeTimestamp)

  const checkins = await GET<Checkin[]>(query)
  return checkins
}

/** ユーザーの最古のチェックインをFirestoreから取得する */
export const fetchOldestCheckinsFromFirestore = async (
  uid: string
): Promise<Checkin | undefined> => {
  const query = usersRef.doc(uid).collection(CHECKINS).orderBy('createdAt', 'asc').limit(1)

  const checkins = await GET<Checkin[]>(query)
  return checkins[0]
}
