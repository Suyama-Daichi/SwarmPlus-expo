import { DateObject } from 'react-native-calendars'
import { Checkin } from './types/Foursquare'

export type RootStackParamList = {
  Root: undefined
  Auth: undefined
  Main: undefined
}

export type BottomTabParamList = {
  CheckinCalendarNavigator: undefined
  CheckinHistoryMap: { checkins?: Checkin[] }
}

export type CheckinCalendarParamList = {
  CheckinsByDay: { dateObject: DateObject }
  CheckinCalendar: undefined
  CheckinDetail: { itemId: string }
  UserProfile: { userId?: string }
  Map: { checkins: Checkin[] }
}
