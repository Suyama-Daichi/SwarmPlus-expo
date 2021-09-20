import { getDateString } from '@/service/dateFns'
import { Checkin } from '@/types/Foursquare'
import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import MapView, { Marker, LatLng } from 'react-native-maps'
import { useRecoil } from '../../../hooks/useRecoil'

type Region = {
  id: string
  title: string
  description?: string
  createdAt: number
  latLng: LatLng
}

const MapScreen = () => {
  const { checkinAgenda, selectedDateOnMap } = useRecoil()
  const [regions, setRegions] = useState<Region[]>([])

  const getRegion = (checkins: Checkin[]) => {
    const regions = checkins.map((m): Region => {
      return {
        id: m.id,
        title: m.venue.name,
        description: m.shout,
        createdAt: m.createdAt,
        latLng: { latitude: m.venue.location.lat, longitude: m.venue.location.lng },
      }
    })
    setRegions(regions)
  }

  useEffect(() => {
    getRegion(checkinAgenda[getDateString(selectedDateOnMap)])
  }, [selectedDateOnMap])

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
      }}
    >
      <MapView style={{ flex: 1 }}>
        {regions.map((region, i) => (
          <Marker
            key={`${i}`}
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
