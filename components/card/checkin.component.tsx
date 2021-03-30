import React, { useState } from 'react'
import { View, Text, StyleSheet, Modal } from 'react-native'
import { CheckinsItem } from '../../interface/Foursquare.type'
import window from '../../constants/Layout'
import { useDate } from '../../hooks/useDate'
import { Avatar, Image, Icon } from 'react-native-elements'
import { useUtils } from '../../hooks/useUtils'
import { ScrollView } from 'react-native-gesture-handler'
import colors from '../../constants/Colors'
import ImageViewer from 'react-native-image-zoom-viewer'
export const Checkin = ({ item }: { item: CheckinsItem }) => {
  const [showModal, setShowModal] = useState(false)
  const [imageIndex, setImageIndex] = useState(0)
  const { formatTimestamp } = useDate()
  const { generateImageUrl } = useUtils()

  return (
    <View
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
          uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
        }}
        icon={{ name: 'person-outline' }}
      />

      <View style={{ paddingLeft: 8, flex: 1 }}>
        <Text style={[styles.fontLerge, styles.venueName]} numberOfLines={2}>
          {item.venue.name}
          {item.isMayor && (
            <Icon
              name={'crown'}
              type={'font-awesome-5'}
              size={17}
              color={colors.light.primaryOrange}
              style={{ paddingHorizontal: 4 }}
            />
          )}
        </Text>
        <Text style={[styles.fontMidium, styles.textSub, { marginBottom: 8 }]} numberOfLines={1}>
          {item.venue.location.state}
          {item.venue.location.city}
          {item.venue.location.address}
        </Text>
        <Text style={[styles.fontMidium, styles.textSub, { paddingVertical: 8 }]}>
          {item.shout}
        </Text>
        <Text style={[styles.fontMidium, styles.textSub]}>
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
        <Text style={[styles.fontMidium, styles.textSub]}>via: {item.source.name}</Text>
      </View>
    </View>
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
  venueName: {
    color: colors.light.textBlack,
  },
  textSub: {
    color: colors.light.textSub,
  },
  fontLerge: {
    fontSize: 24,
  },
  fontMidium: {
    fontSize: 17,
  },
})
