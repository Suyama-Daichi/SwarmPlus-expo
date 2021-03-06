import React, { useState } from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { Avatar, Image, Icon } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/core'
import type { Checkin } from '@/types/Foursquare'
import window from '@/constants/Layout'
import { COLORS } from '@/constants/Colors'
import { useRecoil } from '@/hooks/useRecoil'
import { fontColor, fontSize } from '@/styles/styles'
import useColorScheme from '@/hooks/useColorScheme'
import { Ionicons } from '@expo/vector-icons'
import CategoryIcon from '@/components/molecules/CategoryIcon'
import Address from '@/components/organisms/Address'
import { formatTimestamp } from '@/service/dateFns'
import { generateImageUrl } from '@/service/utilFns'
import { NavigationProp, ParamListBase } from '@react-navigation/native'
import { PhotoViewer } from '../molecules/PhotoViewer'

type Props = {
  item: Checkin
}

export const CheckinCard = React.memo(({ item }: Props) => {
  const colorScheme = useColorScheme()
  const { isMayor, venue, visibility, likes, comments, shout, createdAt, photos } = item

  const navigation = useNavigation<NavigationProp<ParamListBase>>()
  const { user } = useRecoil()
  const [showPhotoViewer, setShowPhotoViewer] = useState(false)
  const [imageIndex, setImageIndex] = useState(0)

  const closePhotoViewer = () => setShowPhotoViewer(false)
  const openPhotoViewer = () => setShowPhotoViewer(true)

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('CheckinDetail', { itemId: item.id })}
      style={[
        styles.container,
        { flexDirection: 'row' },
        { borderBottomColor: COLORS[colorScheme].backgroundSecond, borderBottomWidth: 0.4 },
      ]}
    >
      <Avatar
        rounded
        size={'medium'}
        source={{
          uri: generateImageUrl(user.photo, '50'),
        }}
        icon={{ name: 'person-outline' }}
      >
        {isMayor && (
          <Avatar.Accessory
            size={24}
            name={'crown'}
            type={'font-awesome-5'}
            color={COLORS[colorScheme].coinCrown}
            style={{ backgroundColor: COLORS[colorScheme].background }}
            iconStyle={{ fontSize: 14 }}
          />
        )}
      </Avatar>

      <View style={{ paddingHorizontal: 8, flex: 1 }}>
        {venue.categories.map((category) => (
          <CategoryIcon key={category.id} icon={category.icon} size={24} />
        ))}
        <Text style={[styles.fontLarge, fontColor.venueName]} numberOfLines={2}>
          {venue.name}
          {visibility && <Ionicons name={'lock-closed'} size={16} color={COLORS.common.textSub} />}
        </Text>
        <View style={{ marginBottom: 8 }}>
          <Address location={venue.location} isFull={false} size={'fontMedium'} />
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text
            style={[fontSize.fontMedium, fontColor.venueName, { marginRight: 8 }]}
            numberOfLines={2}
          >
            <Icon
              name={'heart'}
              type={'font-awesome-5'}
              size={16}
              solid
              color={COLORS[colorScheme].pink}
              style={{ paddingHorizontal: 4 }}
            />
            {likes.count}
          </Text>

          <Text style={[fontSize.fontMedium, fontColor.venueName]} numberOfLines={2}>
            <Icon
              name={'comment'}
              type={'font-awesome-5'}
              size={16}
              solid
              color={COLORS[colorScheme].backgroundSecond}
              style={{ paddingHorizontal: 4 }}
            />
            {comments.count}
          </Text>
        </View>
        {shout && (
          <Text style={[fontSize.fontMedium, fontColor.textSub, { marginVertical: 8 }]}>
            {shout}
          </Text>
        )}
        <Text style={[fontSize.fontMedium, fontColor.textSub]}>
          {formatTimestamp(createdAt, 'yyyy/MM/dd(E) HH:mm')}
        </Text>
        <PhotoViewer
          imageIndex={imageIndex}
          showPhotoViewer={showPhotoViewer}
          closePhotoViewer={closePhotoViewer}
          photos={photos.items.map((photo) => {
            return generateImageUrl(photo)
          })}
        />
        <ScrollView horizontal={true}>
          {photos.items.map((photo, i) => {
            return (
              <Image
                key={photo.suffix}
                source={{
                  uri: generateImageUrl(photo, 200),
                }}
                style={{ width: 100, height: 100 }}
                resizeMode={'contain'}
                onPress={() => {
                  openPhotoViewer()
                  setImageIndex(i)
                }}
              />
            )
          })}
        </ScrollView>
      </View>
    </TouchableOpacity>
  )
})
const styles = StyleSheet.create({
  container: {
    height: 'auto',
    width: window.window.width - 16,
    marginVertical: 4,
    padding: 4,
    marginHorizontal: 8,
  },
  border: {
    borderWidth: 0.5,
    borderColor: 'gray',
  },
  fontLarge: {
    fontSize: 24,
  },
})
