import HeaderRight from '@/components/molecules/HeaderRight'
import { useNavigation } from '@/hooks/useNavigation'
import { useUser } from '@/hooks/useUser'
import { generateImageUrl } from '@/service/utilFns'
import { Box, Heading, Input, VStack } from 'native-base'
import React, { useEffect, useState } from 'react'
import { Avatar } from 'react-native-elements'
import DateTimePicker, { Event } from '@react-native-community/datetimepicker'
import { getDateString } from '@/service/dateFns'

const CheckinSearch = () => {
  const { foursquareUser } = useUser()
  const [date, setDate] = useState(new Date())
  const [show, setShow] = useState(false)
  const navigation = useNavigation()

  const onChange = (event: Event, selectedDate?: Date) => {
    const currentDate = selectedDate
    setShow(false)
    currentDate && setDate(currentDate)
  }

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

  return (
    <VStack px={'8px'} space="3" bgColor={'white'}>
      <Box alignItems="center">
        <Heading alignSelf={'flex-start'} size={'sm'}>
          ベニュー名から検索
        </Heading>
        <Input mx="3" placeholder="例: 東京駅" w="100%" />
      </Box>
      <Box alignItems="center">
        <Heading alignSelf={'flex-start'} size={'sm'}>
          チェックイン日から検索
        </Heading>
        <Input
          mx="3"
          placeholder="例: 2022/04/01"
          value={getDateString(date)}
          onPressOut={() => setShow(true)}
          w="100%"
        />
      </Box>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={'date'}
          is24Hour={true}
          onChange={onChange}
        />
      )}
    </VStack>
  )
}

export default CheckinSearch
