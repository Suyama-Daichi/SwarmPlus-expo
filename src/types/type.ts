import { CustomMarking, DotMarking } from 'react-native-calendars'
import { LatLng } from 'react-native-maps'

export type IStartEnd = {
  afterTimestamp: number
  beforeTimestamp: number
}

export type AccessToken = {
  access_token: string
}

export type CalendarEvent = {
  [date: string]: DotMarking & CustomMarking
}

export type RegionData = {
  id: string
  title: string
  description?: string
  createdAt: number
  latLng: LatLng
  image?: string
}
