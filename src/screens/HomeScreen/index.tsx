import { useNavigation } from '@react-navigation/native'
import { Button, FlatList, View } from 'native-base'
import { CardItem } from '@/components/CardItem'
import { Modal } from '@/components/atoms/Modal'
import { ActivityIndicator } from '@/components/atoms/ActivityIndicator'
import { fetchUserCheckins } from '@/api/foursquareApi'
import { useFetchFoursquare } from '@/hooks/useFetch'
import { useAuth } from '@/hooks/useAuth'
import { generateImageUrl } from '@/utils/utilFns'

export const HomeScreen = () => {
  const navigation = useNavigation()
  const { logout } = useAuth()
  const { data: checkins, error: FSError } = useFetchFoursquare([0, 20], fetchUserCheckins, { errorRetryCount: 0 })

  const logoutHandler = async () => {
    logout()
    navigation.push('login')
  }

  if(FSError) return <Modal
    isOpen={true}
    onClose={() => {console.log('called')}}
    headerTitle={'エラーが発生しました'}
    body={'エラー番号: xxxをサポートにお知らせください'}
    buttons={[
      { title: 'はい', onPress: () => {}, close: true },
      { title: 'いいえ', onPress: () => {} }]}/>

  return (
    <>
      {!checkins ? <ActivityIndicator /> :
        <View>
          <Button onPress={logoutHandler}>ログアウト</Button>
          <FlatList
            data={checkins?.items}
            horizontal={true}
            renderItem={({ item }) => <CardItem imageUrl={generateImageUrl(item.photos[0])} title={item.venue.name} />} />
        </View>
      }
    </>
  )
}
