import { CHECKINS, USERS } from '@/constants/CollectionName'
import { firestore } from '@/service/firebase'
import { GET } from '@/service/firestoreFns'
import { Checkin } from '@/types/Foursquare'
const usersRef = firestore.collection(USERS)

export const addCheckins = async (id: string, checkins: Checkin[]) => {
  const mapFnc = checkins.map((checkin) => {
    usersRef
      .doc(id)
      .collection(CHECKINS)
      .doc(checkin.id)
      .set({ ...checkin })
  })
  await Promise.all(mapFnc)
}
