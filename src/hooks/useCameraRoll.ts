import * as MediaLibrary from 'expo-media-library'
import { Alert } from 'react-native'

export const useCameraRoll = () => {
  const savePicture = async (uri: string) => {
    await MediaLibrary.saveToLibraryAsync(uri).catch((e) => Alert.alert('保存に失敗しました', e))
    Alert.alert('保存しました')
  }

  return { savePicture }
}
