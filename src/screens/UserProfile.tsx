import React, { useEffect } from 'react'
import { View, ActivityIndicator } from 'react-native'
import { useRecoil } from '@/hooks/useRecoil'
import { useNavigation } from '@react-navigation/native'
import { useFoursquare } from '@/hooks/useFoursquare'
import UserCard from '@/components/card/UserCard'
import { commonStyles } from '../styles/styles'

const UserProfile = () => {
  const navigation = useNavigation()

  const { user, setUser } = useRecoil()
  const { fetchUser } = useFoursquare()

  const fetchUserAsync = async () => {
    setUser(await fetchUser())
  }

  useEffect(() => {
    void fetchUserAsync()
  }, [])

  useEffect(() => {
    if (!user) return
    navigation.setOptions({ headerTitle: `${user.checkins?.count}回` })
  }, [user])

  if (!user) return <ActivityIndicator />

  return (
    <View style={commonStyles.bk_white}>
      <UserCard />
    </View>
  )
}

export default UserProfile
