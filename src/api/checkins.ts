import { CHECKINS, USERS } from '@/constants/CollectionName'
import { firestore } from '@/service/firebase'
import { Checkin } from '@/types/Foursquare'
const usersRef = firestore.collection(USERS)

export const addCheckins = (id: string, checkins: Checkin[]) => {
  const batch = firestore.batch()
  checkins.forEach((checkin) => {
    const checkinRef = usersRef.doc(id).collection(CHECKINS).doc(checkin.id)
    batch.set(checkinRef, checkin)
  })

  batch.commit()
}
