import * as Location from 'expo-location'
import { LocationObject } from 'expo-location'
import { useEffect, useState } from 'react'

export const useLocation = () => {
  const [location, setLocation] = useState<LocationObject>()

  const getLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync()
    if (status !== 'granted') {
      console.error('Permission to access location was denied')
      return
    }

    const location = await Location.getCurrentPositionAsync({})
    setLocation(location)
  }

  useEffect(() => {
    getLocation()
  }, [])

  return { location }
}
