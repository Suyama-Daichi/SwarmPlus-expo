import { CustomMarking, DotMarking } from 'react-native-calendars'

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
