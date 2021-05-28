import React, { useState } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Modal } from 'react-native'
import { CheckinsItem, User } from '../../interface/Foursquare.type'
import window from '../../constants/Layout'
import { useDate } from '../../hooks/useDate'
import { Avatar, Image, Icon } from 'react-native-elements'
import { useUtils } from '../../hooks/useUtils'
import { ScrollView } from 'react-native-gesture-handler'
import colors from '../../constants/Colors'
import ImageViewer from 'react-native-image-zoom-viewer'
import { useRecoil } from '../../hooks/useRecoil'
import { useNavigation } from '@react-navigation/core'
import { commonStyles } from '../../styles/styles'

export const Checkin = ({ item }: { item: CheckinsItem }) => {
  const navigation = useNavigation()
  const { user } = useRecoil()
  const [showModal, setShowModal] = useState(false)
  const [imageIndex, setImageIndex] = useState(0)
  const { formatTimestamp } = useDate()
  const { generateImageUrl } = useUtils()

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('CheckinDetail', { item })}
      style={[
        styles.container,
        { borderColor: '#707070', borderWidth: 0.3 },
        { flexDirection: 'row' },
      ]}
    >
      <Avatar
        rounded
        size={'medium'}
        source={{
          uri: generateImageUrl(user.photo.prefix, user.photo.suffix, '50'),
        }}
        icon={{ name: 'person-outline' }}
      >
        {item.isMayor && (
          <Avatar.Accessory
            size={24}
            name={'crown'}
            type={'font-awesome-5'}
            color={colors.light.coinCrown}
            style={{ backgroundColor: colors.light.background }}
            iconStyle={{ fontSize: 14 }}
          />
        )}
      </Avatar>

      <View style={{ paddingLeft: 8, flex: 1 }}>
        <Text style={[styles.fontLerge, commonStyles.venueName]} numberOfLines={2}>
          {item.venue.name}
        </Text>

        <Text
          style={[commonStyles.fontMedium, commonStyles.textSub, { marginBottom: 8 }]}
          numberOfLines={1}
        >
          {item.venue.location.state}
          {item.venue.location.city}
          {item.venue.location.address}
        </Text>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text
            style={[commonStyles.fontMedium, commonStyles.venueName, { marginRight: 8 }]}
            numberOfLines={2}
          >
            <Icon
              name={'heart'}
              type={'font-awesome-5'}
              size={16}
              solid
              color={colors.light.pink}
              style={{ paddingHorizontal: 4 }}
            />
            {item.likes.count}
          </Text>

          <Text style={[commonStyles.fontMedium, commonStyles.venueName]} numberOfLines={2}>
            <Icon
              name={'comment'}
              type={'font-awesome-5'}
              size={16}
              solid
              color={colors.light.backgroundSecond}
              style={{ paddingHorizontal: 4 }}
            />
            {item.comments.count}
          </Text>
        </View>

        <Text style={[commonStyles.fontMedium, commonStyles.textSub, { marginVertical: 8 }]}>
          {item.shout}
        </Text>
        <Text style={[commonStyles.fontMedium, commonStyles.textSub]}>
          {formatTimestamp(item.createdAt, 'yyyy/MM/dd HH:mm:ss')}
        </Text>
        <Modal visible={showModal} transparent={true}>
          <ImageViewer
            enableSwipeDown={true}
            index={imageIndex}
            onSwipeDown={() => setShowModal(false)}
            imageUrls={item.photos.items.map((m) => {
              return { url: generateImageUrl(m.prefix, m.suffix) }
            })}
          />
        </Modal>
        <ScrollView horizontal={true}>
          {item.photos.items.map((m, i) => {
            return (
              <Image
                key={m.suffix}
                source={{
                  uri: generateImageUrl(m.prefix, m.suffix),
                }}
                style={{ width: 100, height: 100 }}
                resizeMode={'contain'}
                onPress={() => {
                  setShowModal(true)
                  setImageIndex(i)
                }}
              />
            )
          })}
        </ScrollView>
        <Text style={[commonStyles.fontMedium, commonStyles.textSub]}>via: {item.source.name}</Text>
      </View>
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
  container: {
    height: 'auto',
    width: window.window.width - 16,
    marginVertical: 4,
    padding: 4,
    marginLeft: 8,
  },
  border: {
    borderWidth: 0.5,
    borderColor: 'gray',
  },
  fontLerge: {
    fontSize: 24,
  },
})
