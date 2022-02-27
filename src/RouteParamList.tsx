import { DateObject } from 'react-native-calendars'
import { Checkin } from './types/Foursquare'

export type RootStackParamList = {
  Onboarding: undefined
  Auth: undefined
  Main: undefined
}

export type AppNavigatorParamList = {
  BottomTabsNavigator: undefined
}

export type BottomTabParamList = {
  CheckinSearchNavigator: undefined
}

export type CheckinSearchParamList = {
  CheckinsByDay: { dateObject: DateObject }
  CheckinSearch: undefined
  CheckinDetail: { itemId: string }
  UserProfile: { userId?: string }
  Map: { checkins: Checkin[] }
}
