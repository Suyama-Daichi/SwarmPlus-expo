import { useActionSheet as AS } from '@expo/react-native-action-sheet'
import { useCameraRoll } from './useCameraRoll'

export const useActionSheetForSave = () => {
  const { savePicture } = useCameraRoll()
  const { showActionSheetWithOptions } = AS()

  const openActionSheet = (imageURL?: string) => {
    if (!imageURL) return
    showActionSheetWithOptions({ options: ['保存', 'キャンセル'] }, (buttonIndex) => {
      if (buttonIndex === 0) {
        savePicture(imageURL)
      }
    })
  }

  return openActionSheet
}
