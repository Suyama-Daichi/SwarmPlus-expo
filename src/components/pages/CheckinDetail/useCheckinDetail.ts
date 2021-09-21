import { fetchCheckinDetails } from '@/service/foursquareApi'
import { generateImageUrl } from '@/service/utilFns'
import { CheckinDetail } from '@/types/Foursquare'
import { useNavigation, NavigationProp, ParamListBase } from '@react-navigation/native'
import { useState, useCallback, useEffect } from 'react'

export const useCheckinDetail = (itemId: string) => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>()
  const [checkinDetail, setCheckinDetail] = useState<CheckinDetail & { images: string[] }>()
  const [loading, setLoading] = useState(true)

  const getCheckinDetails = useCallback(async () => {
    const checkinDetail = await fetchCheckinDetails(itemId)
    const images =
      checkinDetail.photos.count > 0
        ? checkinDetail.photos.items.map((photo) => generateImageUrl(photo, 'cap400'))
        : ['']
    setCheckinDetail({ ...checkinDetail, images })
    setLoading(false)
  }, [])

  useEffect(() => {
    if (!itemId) return
    getCheckinDetails()
  }, [])

  useEffect(() => {
    if (!checkinDetail) return
    navigation.setOptions({ headerTitle: checkinDetail.venue.name })
  }, [checkinDetail])

  return { checkinDetail, loading }
}
