import { getDateString } from '@/service/dateFns'
import {
  NavigationProp,
  ParamListBase,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { View, Dimensions } from 'react-native'
import MapView, { Circle, Marker, Region } from 'react-native-maps'
import { useRecoil } from '@/hooks/useRecoil'
import { BottomTabParamList } from '@/types'
import { RegionData } from '@/types/type'
import { getRegions } from '@/service/utilFns'
import { useLocation } from '../../../hooks/useLocation'
const { width } = Dimensions.get('window')

const MapScreen = () => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>()
  const { params } = useRoute<RouteProp<BottomTabParamList, 'CheckinHistoryMap'>>()
  const checkins = params?.checkins
  const { selectedDateOnMap } = useRecoil()
  const [regions, setRegions] = useState<RegionData[]>([])
  const [defaultRegion, setDefaultRegion] = useState<Region>()
  const [currentRegion, setCurrentRegion] = useState<Region>()
  const [radius, setRadius] = useState(0)
  const { location } = useLocation()

  useEffect(() => {
    if (selectedDateOnMap && checkins) {
      navigation.setOptions({
        headerTitle: `${getDateString(selectedDateOnMap, 'yyyy/MM/dd')}の履歴`,
      })
      const { regions, firstRegion } = getRegions(checkins)
      setRegions(regions)
      setDefaultRegion(firstRegion)
    } else {
      if (!location) return
      const { latitude, longitude } = location.coords
      setDefaultRegion({
        latitude,
        longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      })
    }
  }, [checkins, location, navigation, selectedDateOnMap])

  useEffect(() => {
    if (!currentRegion) return
    const scale = Math.floor(Math.log2(360 * (width / 256 / currentRegion.longitudeDelta)))
    let rate = 0
    if (scale > 16) {
      rate = 2000
    } else if (scale > 14) {
      rate = 5000
    } else if (scale > 12) {
      rate = 8000
    } else if (scale > 10) {
      rate = 20000
    } else {
      rate = 30000
    }
    setRadius(rate / scale)
  }, [currentRegion])

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
      }}
    >
      <MapView
        region={currentRegion}
        style={{ flex: 1 }}
        initialRegion={defaultRegion}
        onRegionChangeComplete={(region: Region) => {
          setCurrentRegion(region)
        }}
      >
        {regions.map((region, i) => (
          <Marker
            key={`${i}`}
            title={region.title}
            image={region.image && { uri: region.image }}
            tracksViewChanges={false}
            description={region.description}
            coordinate={region.latLng}
            onCalloutPress={() => navigation.navigate('CheckinDetail', { itemId: region.id })}
          />
        ))}
        {currentRegion && regions.length === 0 && (
          <Circle center={currentRegion} radius={radius} fillColor={'rgba(255, 176, 73, 0.5)'} />
        )}
      </MapView>
    </View>
  )
}

export default MapScreen
