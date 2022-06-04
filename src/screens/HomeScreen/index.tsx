import { signOut } from '@/services/auth.supabase'
import { useNavigation } from '@react-navigation/native'
import { Button, FlatList, View } from 'native-base'
import { CardItem } from '@/components/CardItem'
import useSWR from 'swr'
import { fetchArticles } from '@/api/fetchArticles'
import { Modal } from '@/components/atoms/Modal'
import { ActivityIndicator } from '@/components/atoms/ActivityIndicator'

export const HomeScreen = () => {
  const navigation = useNavigation()
  const { data, error } = useSWR('news', fetchArticles)

  const logoutHandler = async () => {
    await signOut()
    navigation.push('login')
  }

  if(error) return <Modal
    isOpen={true}
    onClose={() => {console.log('called')}}
    headerTitle={'エラーが発生しました'}
    body={'エラー番号: xxxをサポートにお知らせください'}
    buttons={[
      { title: 'はい', onPress: () => {}, close: true },
      { title: 'いいえ', onPress: () => {} }]}/>

  return (
    <>
      {!data ? <ActivityIndicator /> :
        <View>
          <Button onPress={logoutHandler}>ログアウト</Button>
          <FlatList
            data={data.articles}
            horizontal={true}
            renderItem={({ item }) => <CardItem item={item} />} />
        </View>
      }
    </>
  )
}
