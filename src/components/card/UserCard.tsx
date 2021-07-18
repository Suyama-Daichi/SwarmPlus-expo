import React from 'react'
import { View, Text, Linking } from 'react-native'
import { Avatar } from 'react-native-elements/dist/avatar/Avatar'
import { useUtils } from '@/hooks/useUtils'
import { useDate } from '@/hooks/useDate'
import Colors from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import { User } from '@/types/Foursquare'
import { commonStyles } from '@/styles/styles'

type Props = {
  user: User
}

const UserCard = ({ user }: Props) => {
  const { generateImageUrl } = useUtils()
  const { formatTimestamp } = useDate()

  const OpenProvider = (provider: string) => {
    void Linking.openURL(provider)
  }

  return (
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      <Avatar
        source={{ uri: generateImageUrl(user.photo.prefix, user.photo.suffix, '200') }}
        size={'large'}
        rounded={true}
        containerStyle={{ marginVertical: 16 }}
      />
      <Text style={[{ marginBottom: 8 }, { fontSize: 24, fontWeight: 'bold' }]}>
        {user.firstName + user.lastName}
      </Text>
      <View style={[commonStyles.rowCenter, { justifyContent: 'space-around' }, { width: '25%' }]}>
        {user.contact?.twitter && (
          <Ionicons
            name="logo-twitter"
            onPress={() => OpenProvider('https://twitter.com/' + (user.contact?.twitter as string))}
            size={24}
            color={'#1DA1F2'}
          ></Ionicons>
        )}
        {user.contact?.facebook && (
          <Ionicons
            name="logo-facebook"
            onPress={() =>
              OpenProvider(
                'https://www.facebook.com/profile.php?id=' + (user.contact?.facebook as string)
              )
            }
            size={24}
            color={'#4267B2'}
          ></Ionicons>
        )}
        {user.contact?.email && (
          <Ionicons
            name="mail-outline"
            onPress={() => OpenProvider('mailto: ' + (user.contact?.email as string))}
            size={24}
          ></Ionicons>
        )}
      </View>
      <Text style={{ marginBottom: 8 }}>{user.address}</Text>
      <Text style={[{ marginBottom: 24 }, { fontSize: 16 }]}>{user.bio}</Text>
      {user.createdAt && (
        <Text style={{ color: Colors.common.textSub }}>
          {formatTimestamp(user.createdAt, 'yyyy/MM/dd')}に登録
        </Text>
      )}
    </View>
  )
}

export default UserCard
