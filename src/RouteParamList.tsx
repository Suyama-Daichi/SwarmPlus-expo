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
  SearchResult: { query: { keyword: string; date: string } }
  CheckinSearch: undefined
  CheckinDetail: { itemId: string }
  UserProfile: { userId?: string }
  Map: { checkins: Checkin[] }
}
