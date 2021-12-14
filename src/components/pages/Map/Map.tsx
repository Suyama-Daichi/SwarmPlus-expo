import { getDateString } from '@/service/dateFns'
import { Checkin } from '@/types/Foursquare'
import {
  NavigationProp,
  ParamListBase,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import MapView, { Marker, LatLng, Region } from 'react-native-maps'
import { useRecoil } from '@/hooks/useRecoil'
import { BottomTabParamList } from '@/types'

type RegionData = {
  id: string
  title: string
  description?: string
  createdAt: number
  latLng: LatLng
}

const MapScreen = () => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>()
  const { params } = useRoute<RouteProp<BottomTabParamList, 'CheckinHistoryMap'>>()
  const checkins = params?.checkins
  const { selectedDateOnMap } = useRecoil()
  const [regions, setRegions] = useState<RegionData[]>([])
  const [defaultRegion, setDefaultRegion] = useState<Region>()

  const getRegion = (checkins: Checkin[]) => {
    const regions = checkins.map((m): RegionData => {
      return {
        id: m.id,
        title: m.venue.name,
        description: m.shout,
        createdAt: m.createdAt,
        latLng: { latitude: m.venue.location.lat, longitude: m.venue.location.lng },
      }
    })
    const region = {
      latitude: regions[0].latLng.latitude,
      longitude: regions[0].latLng.longitude,
      latitudeDelta: 0.05,
      longitudeDelta: 0.05,
    }
    setRegions(regions)
    setDefaultRegion(region)
  }

  useEffect(() => {
    if (!selectedDateOnMap || !checkins) return
    navigation.setOptions({
      headerTitle: `${getDateString(selectedDateOnMap, 'yyyy/MM/dd')}の履歴`,
    })
    getRegion(checkins)
  }, [selectedDateOnMap])

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
      }}
    >
      <MapView style={{ flex: 1 }} initialRegion={defaultRegion}>
        {regions.map((region, i) => (
          <Marker
            key={`${i}`}
            title={region.title}
            tracksViewChanges={false}
            description={region.description}
            coordinate={region.latLng}
            onCalloutPress={() => navigation.navigate('CheckinDetail', { itemId: region.id })}
          />
        ))}
      </MapView>
    </View>
  )
}

export default MapScreen
