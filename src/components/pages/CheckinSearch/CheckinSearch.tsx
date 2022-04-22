import HeaderRight from '@/components/molecules/HeaderRight'
import { useNavigation } from '@/hooks/useNavigation'
import { useUser } from '@/hooks/useUser'
import { generateImageUrl } from '@/service/utilFns'
import { Box, Heading, Input, VStack } from 'native-base'
import React, { useEffect, useState, useCallback } from 'react'
import { Avatar } from 'react-native-elements'
import { getDateString } from '@/service/dateFns'
import DatePicker from '@/components/molecules/DatePicker'

const CheckinSearch = () => {
  const { foursquareUser } = useUser()
  const [date, setDate] = useState(new Date())
  const [show, setShow] = useState(false)
  const navigation = useNavigation()

  const onSetDate = useCallback((date: Date) => {
    setDate(date)
  }, [])

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
      <DatePicker showDatePickerState={[show, setShow]} onConfirm={onSetDate} />
    </VStack>
  )
}

export default CheckinSearch
