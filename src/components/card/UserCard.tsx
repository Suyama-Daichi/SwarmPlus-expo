import React from 'react'
import { View, Text } from 'react-native'
import { Avatar } from 'react-native-elements/dist/avatar/Avatar'
import { useRecoil } from '@/hooks/useRecoil'
import { useUtils } from '@/hooks/useUtils'
import { useDate } from '@/hooks/useDate'
import Colors from '@/constants/Colors'

const UserCard = () => {
  const { user } = useRecoil()
  const { generateImageUrl } = useUtils()
  const { formatTimestamp } = useDate()
  return (
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      <Avatar
        source={{ uri: generateImageUrl(user.photo.prefix, user.photo.suffix, '200') }}
        size={'large'}
        rounded={true}
        containerStyle={{ marginVertical: 16 }}
      />
      <Text style={[{ marginBottom: 8 }, { fontSize: 24 }]}>{user.firstName + user.lastName}</Text>
      <Text style={{ marginBottom: 8 }}>{user.address}</Text>
      <Text style={{ marginBottom: 24 }}>{user.bio}</Text>
      {user.createdAt && (
        <Text style={{ color: Colors.common.textSub }}>
          {formatTimestamp(user.createdAt, 'yyyy/MM/dd')}に登録
        </Text>
      )}
    </View>
  )
}

export default UserCard
