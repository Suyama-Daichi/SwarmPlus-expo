import { Button, Card, Image, Text } from 'native-base'

export const CardItem = ({ item }) => {
  return <Card w={'120px'} p={'4px'} >
    <Button variant={'ghost'}>
      <Image alt='s' source={{ uri: item.urlToImage }} h='16' resizeMode='contain'/>
      <Text numberOfLines={2} lineHeight='sm'>{item.title}</Text>
    </Button>
  </Card>
}