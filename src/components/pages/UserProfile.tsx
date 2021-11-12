import React, { useEffect, useState } from 'react'
import { View, ActivityIndicator } from 'react-native'
import { useNavigation, RouteProp, useRoute } from '@react-navigation/native'
import UserCard from '@/components/card/UserCard'
import { CheckinCalendarParamList } from '@/types'
import { other } from '@/styles/styles'
import { useUser } from '@/hooks/useUser'
import { fetchUser } from '@/service/foursquareApi'
import { User } from '@/types/Foursquare'

const UserProfile = () => {
  const route = useRoute<RouteProp<CheckinCalendarParamList, 'UserProfile'>>()
  const userId = route.params?.userId
  const navigation = useNavigation()
  const { loginUser, fetchSetUser, loading } = useUser()
  const [user, setUser] = useState<User>()

  useEffect(() => {
    const init = async () => {
      if (!userId) {
        fetchSetUser()
      } else {
        const user = await fetchUser(userId)
        user && setUser(user)
      }
    }

    user && navigation.setOptions({ headerTitle: `${user.checkins?.count}回` })
    init()
  }, [])

  if (loading || !user) return <ActivityIndicator />

  return (
    <View style={other.bk_white}>
      <UserCard user={loginUser || user} />
    </View>
  )
}

export default UserProfile
