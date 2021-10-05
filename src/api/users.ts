import { USERS } from '@/constants/CollectionName'
import { firestore } from '@/service/firebase'
import { GET } from '@/service/firestoreFns'
import { User } from '@/types/Foursquare'
const usersRef = firestore.collection(USERS)

export const fetchUsers = async () => {
  const users = await GET<string>(usersRef.doc('eb63c6c5-9591-4436-910c-9e86e6ad17d7'))
}

export const addUser = async (user: User) => {
  delete user.friends
  delete user.photos
  delete user.checkins
  delete user.lists
  await usersRef.doc(user.id).set(user)
}