import { useCameraRoll } from '@/hooks/useCameraRoll'
import React from 'react'
import { Modal } from 'react-native'
import ImageViewer from 'react-native-image-zoom-viewer'

type Props = {
  imageIndex: number
  showPhotoViewer: boolean
  photos: string[]
  closePhotoViewer: () => void
}

export const PhotoViewer = ({ imageIndex, showPhotoViewer, photos, closePhotoViewer }: Props) => {
  const { savePicture } = useCameraRoll()

  return (
    <Modal visible={showPhotoViewer} transparent={true}>
      <ImageViewer
        menuContext={{ cancel: 'キャンセル', saveToLocal: '保存' }}
        onSave={(d) => savePicture(d)}
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
