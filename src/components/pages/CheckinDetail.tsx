import React, { useState, useEffect, useCallback } from 'react'
import { View, Text, FlatList, ActivityIndicator } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Avatar, Icon } from 'react-native-elements'
import { NavigationProp, ParamListBase, RouteProp } from '@react-navigation/native'
import { ImageCarousel } from '@/components/organisms/ImageCarousel'
import { useDate } from '@/hooks/useDate'
import { useUtils } from '@/hooks/useUtils'
import { useFoursquare } from '@/hooks/useFoursquare'
import { COLORS } from '@/constants/Colors'
import window from '@/constants/Layout'
import { CheckinDetail } from '@/types/Foursquare'
import { fontSize, fontColor, other } from '@/styles/styles'
import CoinIcon from '@/components/CoinIcon.component'
import { RootStackParamList } from '@/types'
import useColorScheme from '@/hooks/useColorScheme'
import MultipleName from '@/components/molecules/MultipleName'
import CategoryIcon from '@/components/molecules/CategoryIcon'
import Address from '@/components/organisms/Address'
import { MayorIcon } from '@/components/organisms/MayorIcon'

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

  if (!checkinDetail) {
    return <ActivityIndicator />
  }
  const itemRender = () => {
    return (
      <View style={{ paddingHorizontal: 8 }}>
        <View style={{ marginVertical: 8 }}>
          {checkinDetail.likes.groups[0] && (
            <MultipleName
              users={checkinDetail.likes.groups[0].items}
              label={
                <Icon
                  name={'heart'}
                  color={COLORS[colorScheme].pink}
                  solid={true}
                  type={'font-awesome-5'}
                  size={12}
                />
              }
              sum={checkinDetail?.likes.summary}
            />
          )}
          {checkinDetail.with && (
            <MultipleName
              users={checkinDetail.with}
              label={
                <Icon
                  name={'users'}
                  color={COLORS[colorScheme].primaryOrange}
                  solid={true}
                  type={'font-awesome-5'}
                  size={12}
                />
              }
            />
          )}
        </View>
        <View style={[{ marginBottom: 8 }]}>
          <View style={[{ marginRight: 4 }, { flexDirection: 'row', alignItems: 'center' }]}>
            {checkinDetail.venue.categories.map((category) => (
              <CategoryIcon key={category.id} icon={category.icon} size={24} />
            ))}
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {checkinDetail.isMayor && <MayorIcon />}
            <Text style={[fontSize.fontLarge, fontColor.venueName, { fontWeight: '600' }]}>
              {checkinDetail.venue.name}
              {checkinDetail.visibility && (
                <Ionicons name={'lock-closed'} size={16} color={COLORS.common.textSub} />
              )}
            </Text>
          </View>
        </View>
        <View style={[other.rowCenter]}>
          <Address location={checkinDetail.venue.location} isFull={true} size={'fontMedium'} />
          <View style={[other.rowCenter, { marginLeft: 8 }]}>
            <CoinIcon />
            <Text style={[fontColor.textSub]}>{`${checkinDetail.score.total}`}</Text>
          </View>
        </View>
        <Text style={[fontColor.textSub, { marginBottom: 8 }]}>
          {formatTimestamp(checkinDetail.createdAt, 'yyyy/MM/dd HH:mm:ss')}(
          {formatDistanceToNowForTimestamp(timestamp2Date(checkinDetail.createdAt))})
        </Text>
        {checkinDetail.shout && (
          <View style={[other.rowCenter, { marginBottom: 16 }]}>
            <Text style={[fontColor.textSub]}>{removeShoutWith(checkinDetail.shout)}</Text>
          </View>
        )}
        <View style={{ marginBottom: 8 }}>
          <Text style={[fontColor.textSub]}>via: {item.source.name}</Text>
        </View>

        {checkinDetail.comments.items?.map((comment, i) => (
          <View
            key={i.toString()}
            style={[
              { borderTopWidth: 0.3, borderColor: '#707070' },
              other.rowCenter,
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
            <View style={[other.rowCenter]}>
              <View style={[{ width: window.window.width * 0.6 }, { paddingLeft: 8 }]}>
                <Text style={{ marginBottom: 16 }}>{`${
                  comment.user.firstName ? comment.user.firstName : ''
                }${comment.user.lastName ? comment.user.lastName : ''}`}</Text>
                <Text style={fontColor.textSub}>{comment.text}</Text>
              </View>
              <View>
                <Text style={fontColor.textSub}>
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
    <View style={[other.bk_white]}>
      <FlatList
        keyExtractor={(_, _index) => _?.id.toString() + _index.toString()}
        ListHeaderComponent={<ImageCarousel images={checkinDetail.images} />}
        data={[checkinDetail]}
        renderItem={itemRender}
      />
    </View>
  )
}
