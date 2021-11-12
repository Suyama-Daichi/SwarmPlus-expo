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

export const fetchCheckinsFromFirestore = async (id: string, period: IPeriod) => {
  const query = usersRef
    .doc(id)
    .collection(CHECKINS)
    .where('createdAt', '>=', period.afterTimestamp)
    .where('createdAt', '<=', period.beforeTimestamp)

  const checkins = await GET<Checkin[]>(query)
  return checkins
}
