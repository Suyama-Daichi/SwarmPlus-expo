import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Avatar } from 'react-native-elements/dist/avatar/Avatar'
import { useRecoil } from '@/hooks/useRecoil'
import { useUtils } from '../../hooks/useUtils'
import { useDate } from '../../hooks/useDate'

const UserCard = () => {
  const { user } = useRecoil()
  const { generateImageUrl } = useUtils()
  const { formatTimestamp } = useDate()

  return (
    <View>
      <Avatar
        source={{ uri: generateImageUrl(user.photo.prefix, user.photo.suffix, '200') }}
        size={'large'}
        rounded={true}
      />
      <Text>{user.firstName + user.lastName}</Text>
      <Text>{user.bio}</Text>
      <Text>{formatTimestamp(user.createdAt, 'yyyy/MM/dd')}に登録</Text>
    </View>
  )
}

export default UserCard

const styles = StyleSheet.create({})
