import React, { useState, useEffect, useRef } from 'react'
import { View, Text, StyleSheet, Modal, Dimensions } from 'react-native'
import window from '../constants/Layout'
import { useDate } from '../hooks/useDate'
import { Avatar, Image, Icon } from 'react-native-elements'
import { useUtils } from '../hooks/useUtils'
import { ScrollView } from 'react-native-gesture-handler'
import colors from '../constants/Colors'
import ImageViewer from 'react-native-image-zoom-viewer'
import { useRecoil } from '../hooks/useRecoil'
import { useFoursquare } from '../hooks/useFoursquare'
import { CheckinsItem } from '../interface/Foursquare.type'
import { commonStyles } from '../styles/styles'
import Carousel from 'react-native-snap-carousel'

export const CheckinDetail = ({ route }) => {
  const { item }: { item: CheckinsItem } = route.params
  const [checkinDetail, setCheckinDetail] = useState<CheckinsItem>()
  const { user } = useRecoil()
  const [activeSlide, setActiveSlide] = useState(0)
  const [showModal, setShowModal] = useState(false)
  const [imageIndex, setImageIndex] = useState(0)
  const [images, setImages] = useState<string[]>([])
  const { fetchCheckinDetails } = useFoursquare()
  const { formatTimestamp } = useDate()
  const { generateImageUrl } = useUtils()
  const carouselRef = useRef()

  const getCheckinDetails = async () => {
    const checkins = await fetchCheckinDetails(item.id)
    setImages(
      checkins.photos.items.map((item) => generateImageUrl(item.prefix, item.suffix, 'cap400'))
    )
    setCheckinDetail(checkins)
    // TODO:チェックイン詳細は取得してあるのでViewにマッピングする
  }

  useEffect(() => {
    getCheckinDetails()
    return () => {}
  }, [item])
  return (
    <View style={commonStyles.bk_white}>
      <Carousel
        data={images}
        renderItem={(d: any) => {
          return (
            <Image
              source={{ uri: d.item }}
              placeholderStyle={{ backgroundColor: colors.light.background }}
              transition
              style={{ width: '100%', height: '100%' }}
              resizeMode="contain"
            />
          )
        }}
        itemWidth={Dimensions.get('window').width * 1.0}
        sliderWidth={Dimensions.get('window').width * 1.0}
        onSnapToItem={(index: number) => setActiveSlide(index)} // for pagination
      />
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
          <Text style={[styles.fontLerge, styles.venueName]} numberOfLines={2}>
            {item.venue.name}
          </Text>

          <Text style={[styles.fontMedium, styles.textSub, { marginBottom: 8 }]} numberOfLines={1}>
            {item.venue.location.state}
            {item.venue.location.city}
            {item.venue.location.address}
          </Text>

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text
              style={[styles.fontMedium, styles.venueName, { marginRight: 8 }]}
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

            <Text style={[styles.fontMedium, styles.venueName]} numberOfLines={2}>
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

          <Text style={[styles.fontMedium, styles.textSub, { marginVertical: 8 }]}>
            {item.shout}
          </Text>
          <Text style={[styles.fontMedium, styles.textSub]}>
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
          <Text style={[styles.fontMedium, styles.textSub]}>via: {item.source.name}</Text>
        </View>
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
  fontMedium: {
    fontSize: 17,
  },
})
