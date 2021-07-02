import { Checkin } from './types/Foursquare'

export type RootStackParamList = {
  Root: undefined
  Auth: undefined
  Main: undefined
  CheckinDetail: { item: Checkin }
}

export type BottomTabParamList = {
  CheckinCalender: undefined
}

export type CheckinCalendarParamList = {
  CheckinCalendar: undefined
  CheckinDetail: undefined
  UserProfile: undefined
}
