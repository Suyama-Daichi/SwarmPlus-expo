import HeaderRight from '@/components/molecules/HeaderRight'
import { useNavigation } from '@/hooks/useNavigation'
import { useUser } from '@/hooks/useUser'
import { generateImageUrl } from '@/service/utilFns'
import React, { useEffect } from 'react'
import { Avatar } from 'react-native-elements'

const CheckinSearch = () => {
  const { foursquareUser } = useUser()
  const navigation = useNavigation()
  useEffect(() => {
    if (!foursquareUser) return

    navigation.setOptions({
      headerRight: () => (
        <HeaderRight>
          <Avatar
            rounded
            size={'small'}
            source={{
              uri: generateImageUrl(foursquareUser.photo, '50'),
            }}
            icon={{ name: 'person-outline' }}
            onPress={() => navigation.push('UserProfile')}
          />
        </HeaderRight>
      ),
    })
  }, [foursquareUser])
  return <></>
}

export default CheckinSearch
