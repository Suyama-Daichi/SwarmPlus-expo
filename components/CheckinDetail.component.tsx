import React, { useState, useEffect, useRef, useCallback } from 'react'
import { View, Text, StyleSheet, Modal, Dimensions, Route } from 'react-native'
import window from '../constants/Layout'
import { useDate } from '../hooks/useDate'
import { Avatar, Image, Icon } from 'react-native-elements'
import { useUtils } from '../hooks/useUtils'
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import colors from '../constants/Colors'
import ImageViewer from 'react-native-image-zoom-viewer'
import { useRecoil } from '../hooks/useRecoil'
import { useFoursquare } from '../hooks/useFoursquare'
import { CheckinsItem } from '../interface/Foursquare.type'
import { commonStyles } from '../styles/styles'
import { ImageCarousel } from '../components/carousel/ImageCarousel.component'

export const CheckinDetail = ({ route }: { route: Route }) => {
  const { item }: { item: CheckinsItem } = route.params
  const [checkinDetail, setCheckinDetail] = useState<CheckinsItem>()
  const [images, setImages] = useState<string[]>([])
  const { fetchCheckinDetails } = useFoursquare()
  const { formatDistanceToNowForTimestamp, timestamp2Date } = useDate()
  const { generateImageUrl } = useUtils()

  const getCheckinDetails = useCallback(async () => {
    const checkins = await fetchCheckinDetails(item.id)
    setImages(
      checkins.photos.count > 0
        ? checkins.photos.items.map((item) => generateImageUrl(item.prefix, item.suffix, 'cap400'))
        : ['']
    )
    setCheckinDetail(checkins)
  }, [])

  useEffect(() => {
    getCheckinDetails()
    return () => {}
  }, [item])

  const itemRender = useCallback(() => {
    return (
      <View style={{ paddingHorizontal: 8 }}>
        {checkinDetail?.likes.groups[0] && (
          <View style={[commonStyles.rowCenter]}>
            <Text style={commonStyles.textSub}>
              いいね！:
              {checkinDetail?.likes.groups[0].items.map((m, i) => (
                <Text key={i.toString()}>
                  {`${m.firstName ? m.firstName : ''}${m.lastName ? m.lastName : ''}`}
                </Text>
              ))}
            </Text>
          </View>
        )}
        <View style={[commonStyles.rowCenter]}>
          <Text style={[commonStyles.fontMedium, commonStyles.venueName]}>
            {checkinDetail?.venue.name}
          </Text>
        </View>
        <View style={[commonStyles.rowCenter]}>
          <Text style={[commonStyles.textSub]}>
            {`${checkinDetail?.venue.location.state}${checkinDetail?.venue.location.city}`}
          </Text>
        </View>
        {checkinDetail?.shout && (
          <View style={[commonStyles.rowCenter]}>
            <Text style={[commonStyles.textSub]}>{`${checkinDetail?.shout}`}</Text>
          </View>
        )}

        {checkinDetail?.comments.items?.map((comment, i) => (
          <View
            key={i.toString()}
            style={[{ borderTopWidth: 0.3, borderColor: '#707070' }, commonStyles.rowCenter]}
          >
            <Avatar
              rounded
              size={'medium'}
              source={{
                uri: generateImageUrl(comment.user.photo.prefix, comment.user.photo.suffix, '50'),
              }}
              icon={{ name: 'person-outline' }}
            ></Avatar>
            <View style={{ flexDirection: 'column' }}>
              <Text>{`${comment.user.firstName ? comment.user.firstName : ''}${
                comment.user.lastName ? comment.user.lastName : ''
              }`}</Text>
              <Text>{comment.text}</Text>
              <Text>{formatDistanceToNowForTimestamp(timestamp2Date(comment.createdAt))}</Text>
            </View>
          </View>
        ))}
      </View>
    )
  }, [checkinDetail])

  return (
    <View style={[commonStyles.bk_white]}>
      <FlatList
        keyExtractor={(_, _index) => _?.id + _index.toString()}
        ListHeaderComponent={<ImageCarousel images={images} />}
        data={[checkinDetail]}
        renderItem={itemRender}
      />
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
