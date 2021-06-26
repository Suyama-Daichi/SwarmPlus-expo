import { Checkin } from './types/Foursquare'

export type RootStackParamList = {
  Main: undefined
  Root: undefined
  CheckinDetail: { item: Checkin }
}

export type BottomTabParamList = {
  CheckinCalender: undefined
}

export type CheckinCalendarParamList = {
  CheckinCalendar: undefined
  CheckinDetail: undefined
}
