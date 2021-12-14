import { getDateString } from '@/service/dateFns'
import {
  NavigationProp,
  ParamListBase,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import MapView, { Marker, Region } from 'react-native-maps'
import { useRecoil } from '@/hooks/useRecoil'
import { BottomTabParamList } from '@/types'
import { RegionData } from '@/types/type'
import { getRegions } from '@/service/utilFns'

const MapScreen = () => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>()
  const { params } = useRoute<RouteProp<BottomTabParamList, 'CheckinHistoryMap'>>()
  const checkins = params?.checkins
  const { selectedDateOnMap } = useRecoil()
  const [regions, setRegions] = useState<RegionData[]>([])
  const [defaultRegion, setDefaultRegion] = useState<Region>()

  useEffect(() => {
    if (!selectedDateOnMap || !checkins) return
    navigation.setOptions({
      headerTitle: `${getDateString(selectedDateOnMap, 'yyyy/MM/dd')}の履歴`,
    })
    const { regions, firstRegion } = getRegions(checkins)
    setRegions(regions)
    setDefaultRegion(firstRegion)
  }, [selectedDateOnMap])

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
      }}
    >
      <MapView
        style={{ flex: 1 }}
        initialRegion={defaultRegion}
        onRegionChangeComplete={(r) => console.log(r)}
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
      </MapView>
    </View>
  )
}

export default MapScreen
