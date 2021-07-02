import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useRecoil } from '@/hooks/useRecoil'
import storage from '@/service/reactNativeStorage'
import { useNavigation } from '@react-navigation/native'
import { FOURSQUARE_ACCESS_TOKEN } from '../constants/StorageKeys'

const UserProfile = () => {
  const navigation = useNavigation()
  const { user } = useRecoil()

  // Recoilで持ってるので再取得する必要あり
  console.log(user)

  const logOut = async () => {
    await storage.remove({ key: FOURSQUARE_ACCESS_TOKEN })
    navigation.navigate('Root')
  }

  return (
    <View>
      <Text>ユーザープロフィール</Text>
      <TouchableOpacity onPress={logOut}>
        <Text>ログアウト</Text>
      </TouchableOpacity>
    </View>
  )
}

export default UserProfile

const styles = StyleSheet.create({})
