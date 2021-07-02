import React, { useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
import { useRecoil } from '@/hooks/useRecoil'
import storage from '@/service/reactNativeStorage'
import { useNavigation } from '@react-navigation/native'
import { useFoursquare } from '@/hooks/useFoursquare'
import UserCard from '@/components/card/UserCard'
import { FOURSQUARE_ACCESS_TOKEN } from '../constants/StorageKeys'
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

  const logOut = async () => {
    await storage.remove({ key: FOURSQUARE_ACCESS_TOKEN })
    navigation.navigate('Root')
  }

  useEffect(() => {
    if (!user) return
    navigation.setOptions({ headerTitle: `${user.checkins?.count}回` })
  }, [user])

  if (!user) return <ActivityIndicator />

  return (
    <View style={commonStyles.bk_white}>
      <UserCard />
      <TouchableOpacity onPress={logOut}>
        <Text>ログアウト</Text>
      </TouchableOpacity>
    </View>
  )
}

export default UserProfile

const styles = StyleSheet.create({})
