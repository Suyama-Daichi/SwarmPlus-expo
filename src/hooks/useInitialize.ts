import { date2Timestamp } from '@/service/dateFns'
import { fetchUser, fetchUserCheckins } from '@/service/foursquareApi'
import { useEffect, useState } from 'react'
import { Checkin } from '@/types/Foursquare'
import { IStartEnd } from '@/types/type'
import { addUser, fetchUsers } from '@/api/users'
import { addCheckins } from '@/api/checkins'
import { useRecoil } from './useRecoil'

export const useInitialize = () => {
  const { setUser, setCheckins, checkins, user } = useRecoil()
  const [loading, setLoading] = useState(true)
  const [tempCheckins, setTempCheckins] = useState<Checkin[]>()

  const fetchSetUser = async () => {
    const user = await fetchUser()
    addUser(user)
    setUser(user)
  }

  const fetchSetAllCheckins = async () => {
    const currentTimestamp = date2Timestamp(new Date())
    const period: IStartEnd = { beforeTimestamp: currentTimestamp.toString() }
    const result = await fetchUserCheckins(period)
    setTempCheckins(result)
  }

  const lazyLoad = async () => {
    if (!tempCheckins) return
    const lastCheckinTimestamp = tempCheckins[tempCheckins.length - 1].createdAt
    const period: IStartEnd = { beforeTimestamp: lastCheckinTimestamp.toString() }
    const result = await fetchUserCheckins(period)
    if (result.length === 0 || result.map((m) => m.createdAt).includes(1576760465)) {
      setCheckins(tempCheckins)
      return
    }
    setTempCheckins([...tempCheckins, ...result])
  }

  useEffect(() => {
    if (!user.id || checkins.length === 0) return
    const addCheckinsToFirestore = async () => {
      await addCheckins(user.id, checkins)
      setLoading(false)
    }
    addCheckinsToFirestore()
  }, [checkins, user])

  useEffect(() => {
    lazyLoad()
  }, [tempCheckins])

  const fetchInitialData = async () => {
    await fetchSetUser()
    await fetchSetAllCheckins()
  }

  return { fetchInitialData, loading }
}
