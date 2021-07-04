import React, { useEffect } from 'react'
import { View, ActivityIndicator } from 'react-native'
import { useRecoil } from '@/hooks/useRecoil'
import { useNavigation } from '@react-navigation/native'
import { useFoursquare } from '@/hooks/useFoursquare'
import UserCard from '@/components/card/UserCard'
import useAsyncFn from 'react-use/lib/useAsyncFn'
import { commonStyles } from '../styles/styles'

const UserProfile = () => {
  const navigation = useNavigation()
  const { setUser } = useRecoil()
  const { fetchUser } = useFoursquare()
  const [userTemp, fetchUserTemp] = useAsyncFn(async () => await fetchUser(), [])

  useEffect(() => {
    void fetchUserTemp()
  }, [])

  useEffect(() => {
    if (!userTemp.value || userTemp.loading) return
    setUser(userTemp.value)
    navigation.setOptions({ headerTitle: `${userTemp.value.checkins?.count}回` })
  }, [userTemp.value])

  if (userTemp.loading) return <ActivityIndicator />

  return (
    <View style={commonStyles.bk_white}>
      <UserCard />
    </View>
  )
}

export default UserProfile
