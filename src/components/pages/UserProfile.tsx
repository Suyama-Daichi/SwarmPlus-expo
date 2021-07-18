import React, { useEffect } from 'react'
import { View, ActivityIndicator } from 'react-native'
import { useRecoil } from '@/hooks/useRecoil'
import { useNavigation, RouteProp } from '@react-navigation/native'
import { useFoursquare } from '@/hooks/useFoursquare'
import UserCard from '@/components/card/UserCard'
import useAsyncFn from 'react-use/lib/useAsyncFn'
import { RootStackParamList } from '@/types'
import { commonStyles } from '@/styles/styles'

type Props = {
  route: RouteProp<RootStackParamList, 'UserProfile'>
}

const UserProfile = ({ route }: Props) => {
  const userId = route.params?.userId
  const navigation = useNavigation()
  const { setUser } = useRecoil()
  const { fetchUser } = useFoursquare()
  const [userTemp, fetchUserTemp] = useAsyncFn(async () => await fetchUser(userId), [])

  useEffect(() => {
    void fetchUserTemp()
  }, [])

  useEffect(() => {
    if (!userTemp.value || userTemp.loading) return
    if (!userId) setUser(userTemp.value) // 自分のユーザーだったら保持
    navigation.setOptions({ headerTitle: `${userTemp.value.checkins?.count}回` })
  }, [userTemp.value])

  if (userTemp.loading || !userTemp.value) return <ActivityIndicator />

  return (
    <View style={commonStyles.bk_white}>
      <UserCard user={userTemp.value} />
    </View>
  )
}

export default UserProfile
