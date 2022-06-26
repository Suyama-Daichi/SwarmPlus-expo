import { Button, Card, Image, Text, TextArea } from 'native-base'
import { Checkin } from '@/types/Foursquare'
import { generateImageUrl } from '@/utils/utilFns'

type Props = {
  checkin: Checkin
}
export const CheckinCard = ({ checkin }: Props) => {
  return (
    <Card w={'1/2'} p={'4px'}>
      <Button variant={'ghost'}>
        <Image
          alt="s"
          source={{ uri: generateImageUrl(checkin.photos.items[0]) }}
          h="48"
          w="48"
          resizeMode="contain"
        />
        <Text numberOfLines={2} lineHeight="sm">
          {checkin.venue.name}
        </Text>
        {checkin.shout && (
          <TextArea
            value={checkin.shout}
            isDisabled={true}
            autoCompleteType="off"
            _disabled={{ color: 'black' }}
          />
        )}
      </Button>
    </Card>
  )
}
