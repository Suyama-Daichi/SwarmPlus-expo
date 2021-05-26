import React, { useState, useEffect, useCallback } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import window from '../constants/Layout'
import { useDate } from '../hooks/useDate'
import { Avatar } from 'react-native-elements'
import { useUtils } from '../hooks/useUtils'
import { FlatList } from 'react-native-gesture-handler'
import colors from '../constants/Colors'
import { useFoursquare } from '../hooks/useFoursquare'
import { CheckinsItem, User } from '../interface/Foursquare.type'
import { commonStyles } from '../styles/styles'
import { ImageCarousel } from '../components/carousel/ImageCarousel.component'
import { NavigationProp } from '@react-navigation/native'
import CoinIcon from './CoinIcon.component'

export const CheckinDetail = ({ route, navigation }) => {
  const { item }: { item: CheckinsItem } = route.params
  const [checkinDetail, setCheckinDetail] = useState<CheckinsItem>()
  const [images, setImages] = useState<string[]>([])
  const { fetchCheckinDetails } = useFoursquare()
  const { formatDistanceToNowForTimestamp, timestamp2Date } = useDate()
  const { generateImageUrl, removeShoutWith } = useUtils()

  const getCheckinDetails = useCallback(async () => {
    const checkins = await fetchCheckinDetails(item.id)
    setImages(
      checkins.photos.count > 0
        ? checkins.photos.items.map((item) => generateImageUrl(item.prefix, item.suffix, 'cap400'))
        : ['']
    )
    ;(navigation as NavigationProp<any>).setOptions({ headerTitle: checkins.venue.name })
    setCheckinDetail(checkins)
  }, [])

  useEffect(() => {
    getCheckinDetails()
    return () => {}
  }, [item])

  const multipleNameRender = useCallback((users: User[], label) => {
    const fullNames = users.map((user) => {
      if (user.lastName && user.firstName) return user.firstName + ' ' + user.lastName
      if (user.firstName) return user.firstName
      if (user.lastName) return user.lastName
    })
    return (
      <View style={[commonStyles.rowCenter]}>
        <Text style={commonStyles.textSub}>
          {label}: <Text>{fullNames.join('と')}</Text>
        </Text>
      </View>
    )
  }, [])

  const itemRender = useCallback(() => {
    return (
      <View style={{ paddingHorizontal: 8 }}>
        <View style={{ marginBottom: 16 }}>
          {checkinDetail?.likes.groups[0] &&
            multipleNameRender(checkinDetail?.likes.groups[0].items, 'いいね！')}
          {checkinDetail?.with && multipleNameRender(checkinDetail?.with, '一緒')}
        </View>
        <View style={[commonStyles.rowCenter, { marginBottom: 8 }]}>
          <Text style={[commonStyles.fontMedium, commonStyles.venueName]}>
            {checkinDetail?.venue.name}
          </Text>
        </View>
        <View style={[commonStyles.rowCenter, { marginBottom: 8 }]}>
          <Text style={[commonStyles.textSub]}>
            {`${checkinDetail?.venue.location.state}${checkinDetail?.venue.location.city || ''}`}
          </Text>
          <View style={[commonStyles.rowCenter, { marginLeft: 8 }]}>
            <CoinIcon />
            <Text style={[commonStyles.textSub]}>{`${checkinDetail?.score.total}`}</Text>
          </View>
        </View>
        {checkinDetail?.shout && (
          <View style={[commonStyles.rowCenter, { marginBottom: 24 }]}>
            <Text style={[commonStyles.textSub]}>{removeShoutWith(checkinDetail?.shout)}</Text>
          </View>
        )}

        {checkinDetail?.comments.items?.map((comment, i) => (
          <View
            key={i.toString()}
            style={[
              { borderTopWidth: 0.3, borderColor: '#707070' },
              commonStyles.rowCenter,
              { padding: 8 },
            ]}
          >
            <Avatar
              rounded
              size={'medium'}
              source={{
                uri: generateImageUrl(comment.user.photo.prefix, comment.user.photo.suffix, '50'),
              }}
              icon={{ name: 'person-outline' }}
            ></Avatar>
            <View style={[commonStyles.rowCenter]}>
              <View style={[{ width: window.window.width * 0.6 }, { paddingLeft: 8 }]}>
                <Text style={{ marginBottom: 16 }}>{`${
                  comment.user.firstName ? comment.user.firstName : ''
                }${comment.user.lastName ? comment.user.lastName : ''}`}</Text>
                <Text style={commonStyles.textSub}>{comment.text}</Text>
              </View>
              <View>
                <Text style={commonStyles.textSub}>
                  {formatDistanceToNowForTimestamp(timestamp2Date(comment.createdAt))}
                </Text>
              </View>
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
