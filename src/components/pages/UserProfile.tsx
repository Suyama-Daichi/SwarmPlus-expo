import React, { useEffect, useState } from 'react'
import { View, ActivityIndicator } from 'react-native'
import { useNavigation, RouteProp, useRoute } from '@react-navigation/native'
import UserCard from '@/components/card/UserCard'
import { CheckinCalendarParamList } from '@/types'
import { other } from '@/styles/styles'
import { useUser } from '@/hooks/useUser'
import { fetchUser } from '@/service/foursquareApi'
import { FoursquareUser } from '@/types/Foursquare'

const UserProfile = () => {
  const route = useRoute<RouteProp<CheckinCalendarParamList, 'UserProfile'>>()
  const userId = route.params?.userId
  const navigation = useNavigation()
  const { foursquareUser } = useUser()
  const [user, setUser] = useState<FoursquareUser>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const init = async () => {
      if (userId) {
        const user = await fetchUser(userId)
        user && setUser(user)
      } else {
        if (!foursquareUser) return
        setUser(foursquareUser)
      }
      setLoading(false)
    }

    init()
  }, [userId, foursquareUser])

  useEffect(() => {
    if (!user) return
    user && navigation.setOptions({ headerTitle: `${user.checkins?.count}回` })
  }, [user])

  if (loading || !user) return <ActivityIndicator />

  return (
    <View style={other.bk_white}>
      <UserCard user={user} />
    </View>
  )
}

export default UserProfile
