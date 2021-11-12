import { CollectionRef, DocumentRef, Query } from './firebase'

export const GET = async <T>(ref: CollectionRef | Query | DocumentRef) => {
  let data

  if ('where' in ref) {
    data = (await ref.get()).docs.map((m) => m.data())
  } else {
    data = (await ref.get()).data()
  }

  return data as T
}
