import { Button, Card, Image, Text } from 'native-base'

type Props = {
  imageUrl: string
  title: string
}
export const CardItem = ({ imageUrl, title }: Props) => {
  return (
    <Card w={'120px'} p={'4px'}>
      <Button variant={'ghost'}>
        <Image alt="s" source={{ uri: imageUrl }} h="16" resizeMode="contain" />
        <Text numberOfLines={2} lineHeight="sm">
          {title}
        </Text>
      </Button>
    </Card>
  )
}
