import React from 'react'
import { View, Text, FlatList, ActivityIndicator } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Avatar, Icon } from 'react-native-elements'
import { ImageCarousel } from '@/components/organisms/ImageCarousel'
import { COLORS } from '@/constants/Colors'
import window from '@/constants/Layout'
import { fontSize, fontColor, other } from '@/styles/styles'
import CoinIcon from '@/components/CoinIcon.component'
import MultipleName from '@/components/molecules/MultipleName'
import CategoryIcon from '@/components/molecules/CategoryIcon'
import Address from '@/components/organisms/Address'
import { MayorIcon } from '@/components/organisms/MayorIcon'
import { formatTimestamp, formatDistanceToNowForTimestamp, timestamp2Date } from '@/service/dateFns'
import { generateImageUrl, removeShoutWith } from '@/service/utilFns'
import { NoData } from '@/components/organisms/NoData'
import useColorScheme from '@/hooks/useColorScheme'
import { CheckinSearchParamList } from '@/types'
import { useRoute, RouteProp } from '@react-navigation/native'
import { useCheckinDetail } from './useCheckinDetail'

export const CheckinDetailScreen = () => {
  const route = useRoute<RouteProp<CheckinSearchParamList, 'CheckinDetail'>>()
  const { checkinDetail, loading } = useCheckinDetail(route.params.itemId)

  const colorScheme = useColorScheme()
  if (loading) return <ActivityIndicator />
  if (!checkinDetail) return <NoData />

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
              sum={checkinDetail.likes.summary}
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
          {formatTimestamp(checkinDetail.createdAt, 'yyyy/MM/dd(E) HH:mm:ss')}(
          {formatDistanceToNowForTimestamp(timestamp2Date(checkinDetail.createdAt))})
        </Text>
        {checkinDetail.shout && (
          <View style={[other.rowCenter, { marginBottom: 16 }]}>
            <Text style={[fontColor.textSub]}>{removeShoutWith(checkinDetail.shout)}</Text>
          </View>
        )}
        <View style={{ marginBottom: 8 }}>
          <Text style={[fontColor.textSub]}>via: {checkinDetail.source.name}</Text>
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
                uri: generateImageUrl(comment.user.photo, '50'),
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
