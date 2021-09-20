import { useFoursquare } from '@/hooks/useFoursquare'
import { generateImageUrl } from '@/service/utilFns'
import { RootStackParamList } from '@/types'
import { CheckinDetail } from '@/types/Foursquare'
import {
  useNavigation,
  NavigationProp,
  ParamListBase,
  useRoute,
  RouteProp,
} from '@react-navigation/native'
import { useState, useCallback, useEffect } from 'react'

export const useCheckinDetail = () => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>()
  const route = useRoute<RouteProp<RootStackParamList, 'CheckinDetail'>>()
  const { item } = route.params
  const [checkinDetail, setCheckinDetail] = useState<CheckinDetail & { images: string[] }>()
  const { fetchCheckinDetails } = useFoursquare()
  const [loading, setLoading] = useState(true)

  const getCheckinDetails = useCallback(async () => {
    const checkinDetail = await fetchCheckinDetails(item.id)
    const images =
      item.photos.count > 0
        ? checkinDetail.photos.items.map((item) =>
            generateImageUrl(item.prefix, item.suffix, 'cap400')
          )
        : ['']
    setCheckinDetail({ ...checkinDetail, images })
    setLoading(false)
  }, [])

  useEffect(() => {
    if (!item) return
    navigation.setOptions({ headerTitle: item.venue.name })
    getCheckinDetails()
  }, [item])

  return { checkinDetail, loading }
}
