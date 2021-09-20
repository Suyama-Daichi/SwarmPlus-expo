import { getDateString } from '@/service/dateFns'
import { MapParamList } from '@/types'
import { Checkin } from '@/types/Foursquare'
import { useRoute } from '@react-navigation/core'
import { RouteProp } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import MapView, { Marker, LatLng } from 'react-native-maps'
import { useRecoil } from '../../../hooks/useRecoil'

type Region = {
  id: string
  title: string
  description?: string
  latLng: LatLng
}

const MapScreen = () => {
  const route = useRoute<RouteProp<MapParamList, 'Map'>>()
  const { checkinAgenda } = useRecoil()
  const [regions, setRegions] = useState<Region[]>([])

  const getRegion = (checkins: Checkin[]) => {
    const regions = checkins.map((m): Region => {
      return {
        id: m.id,
        title: m.venue.name,
        description: m.shout,
        latLng: { latitude: m.venue.location.lat, longitude: m.venue.location.lng },
      }
    })
    setRegions(regions)
  }

  useEffect(() => {
    const date = route.params?.dateISOString ? new Date(route.params.dateISOString) : new Date()
    getRegion(checkinAgenda[getDateString(date)])
  }, [route])

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
      }}
    >
      <MapView style={{ flex: 1 }}>
        {regions.map((region) => (
          <Marker
            key={region.id}
            title={region.title}
            description={region.description}
            coordinate={region.latLng}
          />
        ))}
      </MapView>
    </View>
  )
}

export default MapScreen

const styles = StyleSheet.create({})
