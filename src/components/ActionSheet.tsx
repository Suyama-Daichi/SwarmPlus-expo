import React from 'react'
import { Alert } from 'react-native'
import { useActionSheet } from '@expo/react-native-action-sheet'
import { Ionicons } from '@expo/vector-icons'
import { FOURSQUARE_ACCESS_TOKEN } from '@/constants/StorageKeys'
import storage from '@/service/reactNativeStorage'
import { COLORS } from '@/constants/Colors'
import { reloadAsync } from 'expo-updates'

export const ActionMenu = () => {
  const options = ['ログアウト', 'キャンセル']
  const destructiveButtonIndex = 0
  const cancelButtonIndex = 1

  const { showActionSheetWithOptions } = useActionSheet()

  const logOut = async () => {
    await storage.remove({ key: FOURSQUARE_ACCESS_TOKEN })
    reloadAsync()
  }

  const actionSheetHandler = () => {
    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        destructiveButtonIndex,
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          Alert.alert('ログアウトしますか', '', [
            {
              text: 'キャンセル',
              style: 'cancel',
            },
            {
              text: 'ログアウト',
              style: 'destructive',
              onPress: logOut,
            },
          ])
        }
      }
    )
  }
  return (
    <Ionicons
      name={'ellipsis-horizontal'}
      style={{ marginRight: 16 }}
      size={24}
      color={COLORS.common.textSub}
      onPress={actionSheetHandler}
    />
  )
}
export default ActionMenu
