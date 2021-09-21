import { getDateString } from '@/service/dateFns'
import { Checkin } from '@/types/Foursquare'
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { View, StyleSheet } from 'react-native'
import MapView, { Marker, LatLng, Region } from 'react-native-maps'
import { useRecoil } from '@/hooks/useRecoil'
import { generateImageUrl } from '@/service/utilFns'

type RegionData = {
  id: string
  title: string
  description?: string
  image?: string
  createdAt: number
  latLng: LatLng
}

const MapScreen = () => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>()
  const { checkinAgenda, selectedDateOnMap } = useRecoil()
  const [regions, setRegions] = useState<RegionData[]>([])
  const [defaultRegion, setDefaultRegion] = useState<Region>()

  const getRegion = (checkins: Checkin[]) => {
    const regions = checkins.map((m): RegionData => {
      return {
        id: m.id,
        title: m.venue.name,
        description: m.shout,
        // image: generateImageUrl(m.photos.items[0].prefix, m.photos.items[0].suffix),
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
    if (!selectedDateOnMap) return
    navigation.setOptions({
      headerTitle: `${getDateString(selectedDateOnMap, 'yyyy/MM/dd')}の履歴`,
    })
    getRegion(checkinAgenda[getDateString(selectedDateOnMap)])
  }, [selectedDateOnMap])

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
      }}
    >
      <MapView style={{ flex: 1 }} region={defaultRegion}>
        {regions.map((region, i) => (
          <Marker
            key={`${i}`}
            title={region.title}
            // image={{ uri: region.image }}
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

const styles = StyleSheet.create({})
