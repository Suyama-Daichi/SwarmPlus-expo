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
  const [data, fetchData] = useAsyncFn(async () => {
    return { user: await fetchUser() }
  }, [])

  const { user, setUser } = useRecoil()
  const { fetchUser } = useFoursquare()

  useEffect(() => {
    void fetchData()
  }, [])

  useEffect(() => {
    if (!data.value?.user) return
    setUser(data.value.user)
    navigation.setOptions({ headerTitle: `${user.checkins?.count}回` })
  }, [data.value])

  if (data.loading) return <ActivityIndicator />

  return (
    <View style={commonStyles.bk_white}>
      <UserCard />
    </View>
  )
}

export default UserProfile
