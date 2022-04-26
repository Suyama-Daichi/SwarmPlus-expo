import { fetchUserCheckins } from '@/service/foursquareApi'
import { fetchOldestCheckinsFromFirestore, saveCheckinsToFirestore } from '@/api/checkins'
import { useUser } from '@/hooks/useUser'
import { useCallback } from 'react'
import { useAuth } from '@/hooks/useAuth'

/** ユーザーの過去のチェックインを取得し、Firestoreに保存・管理するhooks */
export const useFetchCheckins = () => {
  const { foursquareUser } = useUser()
  const { accessToken } = useAuth()

  const fetchCheckins = useCallback(async () => {
    if (!foursquareUser || !accessToken) return
    // Firebaseの最古のチェックインを取得する
    const oldestCheckin = await fetchOldestCheckinsFromFirestore(foursquareUser.id)
    // 最古のチェックインから250件取得する
    const checkinsFromFoursquare = await fetchUserCheckins(accessToken, oldestCheckin?.createdAt)
    if (!checkinsFromFoursquare || checkinsFromFoursquare.length === 0) return
    // 取得したチェックインをFirestoreに保存する
    saveCheckinsToFirestore(foursquareUser.id, checkinsFromFoursquare)
  }, [accessToken, foursquareUser])

  return { fetchCheckins }
}
