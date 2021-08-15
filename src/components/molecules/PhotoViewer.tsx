import { useCameraRoll } from '@/hooks/useCameraRoll'
import React from 'react'
import { Modal } from 'react-native'
import ImageViewer from 'react-native-image-zoom-viewer'
import { useActionSheet } from '@expo/react-native-action-sheet'
import { IImageInfo } from 'react-native-image-zoom-viewer/built/image-viewer.type'

type Props = {
  imageIndex: number
  showPhotoViewer: boolean
  photos: string[]
  closePhotoViewer: () => void
}

export const PhotoViewer = ({ imageIndex, showPhotoViewer, photos, closePhotoViewer }: Props) => {
  const { savePicture } = useCameraRoll()
  const { showActionSheetWithOptions } = useActionSheet()

  const openActionSheet = (imageInfo?: IImageInfo) => {
    if (!imageInfo) return
    showActionSheetWithOptions({ options: ['保存', 'キャンセル'] }, (buttonIndex) => {
      if (buttonIndex === 0) {
        void savePicture(imageInfo.url)
      }
    })
  }

  return (
    <Modal visible={showPhotoViewer} transparent={true}>
      <ImageViewer
        onLongPress={(imageInfo) => openActionSheet(imageInfo)}
        saveToLocalByLongPress={false}
        enableSwipeDown={true}
        index={imageIndex}
        onSwipeDown={closePhotoViewer}
        imageUrls={photos.map((photo) => {
          return { url: photo }
        })}
      />
    </Modal>
  )
}
