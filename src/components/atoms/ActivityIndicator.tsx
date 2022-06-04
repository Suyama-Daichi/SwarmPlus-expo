import { Modal } from 'native-base'
import { ActivityIndicator as RNActivityIndicator } from 'react-native'

/** オーバーレイなActivityIndicator */
export const ActivityIndicator = () => {
  return (
    <Modal
      isOpen={true}
      closeOnOverlayClick={false}>
      <RNActivityIndicator color={'white'} size='large' />
    </Modal>
  )
}