import { fetchUser } from '@/service/foursquareApi'
import { useEffect, useState } from 'react'
import { addUser } from '@/api/users'
import { addCheckins } from '@/api/checkins'
import { useRecoil } from './useRecoil'
import { useAllCheckins } from './useAllCheckins'

export const useInitialize = () => {
  const { setUser, setCheckins, checkins, user } = useRecoil()
  const [loading, setLoading] = useState(true)
  const { fetchAllCheckins, allCheckins } = useAllCheckins()

  const fetchSetUser = async () => {
    const { response } = await fetchUser()
    const { user } = { ...response }
    user && addUser(user)
    setUser(user)
    return user
  }

  useEffect(() => {
    if (!allCheckins) return
    setCheckins(allCheckins)
  }, [allCheckins])

  useEffect(() => {
    if (!user || checkins.length === 0) return
    const addCheckinsToFirestore = async () => {
      await addCheckins(user.id, checkins)
      setLoading(false)
    }
    addCheckinsToFirestore()
  }, [checkins, user])

  const fetchInitialData = async () => {
    const user = await fetchSetUser()
    if (!user?.checkins) return
    fetchAllCheckins(user.checkins.count)
  }

  return { fetchInitialData, loading }
}
