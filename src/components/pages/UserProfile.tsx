import React, { useEffect, useState } from 'react'
import { View, ActivityIndicator } from 'react-native'
import { useRecoil } from '@/hooks/useRecoil'
import { useNavigation, RouteProp, useRoute } from '@react-navigation/native'
import UserCard from '@/components/card/UserCard'
import { CheckinCalendarParamList } from '@/types'
import { other } from '@/styles/styles'
import { fetchUser } from '@/service/foursquareApi'

const UserProfile = () => {
  const route = useRoute<RouteProp<CheckinCalendarParamList, 'UserProfile'>>()
  const userId = route.params?.userId
  const navigation = useNavigation()
  const { setUser, user } = useRecoil()
  const [loading, setLoading] = useState(true)

  const fetchUserTemp = async () => {
    await fetchUser(userId)
    setLoading(false)
  }

  useEffect(() => {
    fetchUserTemp()
  }, [])

  useEffect(() => {
    if (!user || loading) return
    if (!userId) setUser(user) // 自分のユーザーだったら保持
    navigation.setOptions({ headerTitle: `${user.checkins?.count}回` })
  }, [user])

  if (loading || !user) return <ActivityIndicator />

  return (
    <View style={other.bk_white}>
      <UserCard user={user} />
    </View>
  )
}

export default UserProfile
