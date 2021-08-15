import React from 'react'
import { Modal } from 'react-native'
import ImageViewer from 'react-native-image-zoom-viewer'
import { useActionSheetForSave } from '@/hooks/useActionSheetForSave'

type Props = {
  imageIndex: number
  showPhotoViewer: boolean
  photos: string[]
  closePhotoViewer: () => void
}

export const PhotoViewer = ({ imageIndex, showPhotoViewer, photos, closePhotoViewer }: Props) => {
  const openActionSheet = useActionSheetForSave()

  return (
    <Modal visible={showPhotoViewer} transparent={true}>
      <ImageViewer
        onLongPress={(imageInfo) => openActionSheet(imageInfo?.url)}
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
