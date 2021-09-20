import { Checkin } from './types/Foursquare'

export type RootStackParamList = {
  Root: undefined
  Auth: undefined
  Main: undefined
  CheckinDetail: { item: Checkin }
  UserProfile: { userId?: string }
}

export type BottomTabParamList = {
  CheckinCalendarNavigator: undefined
  MapNavigator: undefined
}

export type CheckinCalendarParamList = {
  CheckinCalendar: undefined
  CheckinDetail: undefined
  UserProfile: undefined
}

export type MapParamList = {
  CheckinCalendar: undefined
  CheckinDetail: undefined
  Map: undefined
}
