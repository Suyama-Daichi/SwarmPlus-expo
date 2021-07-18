import React, { useState, useEffect, useCallback } from 'react'
import { View, Text, FlatList, ActivityIndicator } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Avatar, Image, Icon } from 'react-native-elements'
import { NavigationProp, ParamListBase, RouteProp } from '@react-navigation/native'
import { ImageCarousel } from '@/components/carousel/ImageCarousel.component'
import { useDate } from '@/hooks/useDate'
import { useUtils } from '@/hooks/useUtils'
import { useFoursquare } from '@/hooks/useFoursquare'
import { COLORS } from '@/constants/Colors'
import window from '@/constants/Layout'
import { CheckinDetail, User } from '@/types/Foursquare'
import { commonStyles } from '@/styles/styles'
import CoinIcon from '@/components/CoinIcon.component'
import { RootStackParamList } from '@/types'
import useColorScheme from '@/hooks/useColorScheme'

type Props = {
  route: RouteProp<RootStackParamList, 'CheckinDetail'>
  navigation: NavigationProp<ParamListBase>
}

export const CheckinDetailScreen = ({ route, navigation }: Props) => {
  const colorScheme = useColorScheme()
  const { item } = route.params
  const [checkinDetail, setCheckinDetail] = useState<CheckinDetail & { images: string[] }>()
  const { fetchCheckinDetails } = useFoursquare()
  const { formatDistanceToNowForTimestamp, timestamp2Date, formatTimestamp } = useDate()
  const { generateImageUrl, removeShoutWith } = useUtils()

  const getCheckinDetails = useCallback(async () => {
    const checkinDetail = await fetchCheckinDetails(item.id)
    const images =
      item.photos.count > 0
        ? checkinDetail.photos.items.map((item) =>
            generateImageUrl(item.prefix, item.suffix, 'cap400')
          )
        : ['']
    setCheckinDetail({ ...checkinDetail, images })
  }, [])

  useEffect(() => {
    if (!item) return
    navigation.setOptions({ headerTitle: item.venue.name })
    void getCheckinDetails()
  }, [item])

  const multipleNameRender = (users: User[], label) => {
    const fullNames = users.map((user) => {
      if (user.lastName && user.firstName) return user.firstName + ' ' + user.lastName
      if (user.firstName) return user.firstName
      if (user.lastName) return user.lastName
    })
    return (
      <View style={[commonStyles.rowCenter]}>
        <Text style={commonStyles.textSub}>
          <View>{label}</View> <Text>{fullNames.join('と') || checkinDetail?.likes.summary}</Text>
        </Text>
      </View>
    )
  }

  if (!checkinDetail) {
    return <ActivityIndicator />
  }
  const itemRender = () => {
    return (
      <View style={{ paddingHorizontal: 8 }}>
        <View style={{ marginVertical: 8 }}>
          {checkinDetail.likes.groups[0] &&
            multipleNameRender(
              checkinDetail.likes.groups[0].items,
              <Icon
                name={'heart'}
                color={COLORS[colorScheme].pink}
                solid={true}
                type={'font-awesome-5'}
                size={12}
              />
            )}
          {checkinDetail.with &&
            multipleNameRender(
              checkinDetail.with,
              <Icon
                name={'users'}
                color={COLORS[colorScheme].primaryOrange}
                solid={true}
                type={'font-awesome-5'}
                size={12}
              />
            )}
        </View>
        <View style={[commonStyles.rowCenter, { marginBottom: 8 }]}>
          <View
            style={[{ backgroundColor: COLORS[colorScheme].backgroundSecond }, { marginRight: 4 }]}
          >
            <Image
              source={{
                uri: generateImageUrl(
                  checkinDetail.venue.categories[0].icon.prefix,
                  checkinDetail.venue.categories[0].icon.suffix,
                  '32'
                ),
              }}
              style={{ width: 24, height: 24 }}
            />
          </View>
          <Text style={[commonStyles.fontMedium, commonStyles.venueName]}>
            {checkinDetail.venue.name}{' '}
            {checkinDetail.visibility && (
              <Ionicons name={'lock-closed'} size={16} color={Colors.common.textSub} />
            )}
          </Text>
        </View>
        <View style={[commonStyles.rowCenter]}>
          <Text style={[commonStyles.textSub]}>
            {`${checkinDetail.venue.location.state}${checkinDetail.venue.location.city || ''}${
              item.venue.location.address || ''
            }`}
          </Text>
          <View style={[commonStyles.rowCenter, { marginLeft: 8 }]}>
            <CoinIcon />
            <Text style={[commonStyles.textSub]}>{`${checkinDetail.score.total}`}</Text>
          </View>
        </View>
        <Text style={[commonStyles.textSub, { marginBottom: 8 }]}>
          {formatTimestamp(checkinDetail.createdAt, 'yyyy/MM/dd HH:mm:ss')}(
          {formatDistanceToNowForTimestamp(timestamp2Date(checkinDetail.createdAt))})
        </Text>
        {checkinDetail.shout && (
          <View style={[commonStyles.rowCenter, { marginBottom: 16 }]}>
            <Text style={[commonStyles.textSub]}>{removeShoutWith(checkinDetail.shout)}</Text>
          </View>
        )}
        <View style={{ marginBottom: 8 }}>
          <Text style={[commonStyles.textSub]}>via: {item.source.name}</Text>
        </View>

        {checkinDetail.comments.items?.map((comment, i) => (
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
  }

  return (
    <View style={[commonStyles.bk_white]}>
      <FlatList
        keyExtractor={(_, _index) => _?.id.toString() + _index.toString()}
        ListHeaderComponent={<ImageCarousel images={checkinDetail.images} />}
        data={[checkinDetail]}
        renderItem={itemRender}
      />
    </View>
  )
}
