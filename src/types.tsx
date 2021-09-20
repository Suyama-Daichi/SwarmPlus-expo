export type RootStackParamList = {
  Root: undefined
  Auth: undefined
  Main: undefined
}

export type BottomTabParamList = {
  CheckinCalendarNavigator: undefined
  MapNavigator: undefined
}

export type CheckinCalendarParamList = {
  CheckinCalendar: undefined
  CheckinDetail: { itemId: string }
  UserProfile: { userId?: string }
}

export type MapParamList = {
  CheckinCalendar: undefined
  CheckinDetail: { itemId: string }
  Map: undefined
}
