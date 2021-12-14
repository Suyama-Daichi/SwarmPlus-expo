import { Ionicons } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import * as React from 'react'
import useColorScheme from '@/hooks/useColorScheme'
import { CheckinDetailScreen } from '@/components/pages/CheckinDetail/CheckinDetail'
import BackButton from '@/components/molecules/BackButton'

import { COLORS } from '@/constants/Colors'
import { BottomTabParamList, CheckinCalendarParamList } from '@/types'
import CheckinCalendar from '@/components/pages/CheckinCalendar/CheckinCalendar'
import ActionMenu from '@/components/ActionSheet'
import UserProfile from '@/components/pages/UserProfile'
import { useNavigation } from '@react-navigation/core'
import MapScreen from '@/components/pages/Map/Map'
import { useEffect } from 'react'
import CheckinsByDay from '@/components/pages/CheckinsByDay/CheckinsByDay'

const BottomTab = createBottomTabNavigator<BottomTabParamList>()

export default function BottomTabNavigator() {
  const navigation = useNavigation()
  useEffect(
    () =>
      navigation.addListener('beforeRemove', (e) => {
        // Prevent default behavior of leaving the screen
        e.preventDefault()
      }),
    [navigation]
  )

  const colorScheme = useColorScheme()

  return (
    <BottomTab.Navigator
      initialRouteName="CheckinCalendarNavigator"
      tabBarOptions={{ activeTintColor: COLORS[colorScheme].tint, showLabel: false }}
    >
      <BottomTab.Screen
        name="CheckinCalendarNavigator"
        component={CheckinCalendarNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="calendar" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="CheckinHistoryMap"
        component={CheckinHistoryMapNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="map" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  )
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: React.ComponentProps<typeof Ionicons>['name']; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const CheckinCalendarStack = createStackNavigator<CheckinCalendarParamList>()

function CheckinCalendarNavigator() {
  return (
    <CheckinCalendarStack.Navigator initialRouteName={'CheckinCalendar'} mode={'card'}>
      <CheckinCalendarStack.Screen
        name={'CheckinCalendar'}
        component={CheckinCalendar}
        options={{
          headerLeft: () => null,
          headerTitle: 'カレンダーで振り返る',
        }}
      />
      <CheckinCalendarStack.Screen
        name={'CheckinsByDay'}
        component={CheckinsByDay}
        options={{
          headerTitle: '',
          headerLeft: BackButton,
        }}
      />
      <CheckinCalendarStack.Screen
        name={'UserProfile'}
        component={UserProfile}
        options={{
          headerTitle: 'ユーザープロフィール',
          headerLeft: BackButton,
          headerRight: ActionMenu,
        }}
      />
      <CheckinCalendarStack.Screen
        name={'Map'}
        component={MapScreen}
        options={{
          headerLeft: BackButton,
          headerTitle: 'マップで見る',
        }}
      />
      <CheckinCalendarStack.Screen
        name={'CheckinDetail'}
        component={CheckinDetailScreen}
        options={{
          headerTitle: 'チェックインの詳細',
          headerLeft: BackButton,
        }}
      />
    </CheckinCalendarStack.Navigator>
  )
}

function CheckinHistoryMapNavigator() {
  return (
    <CheckinCalendarStack.Navigator initialRouteName={'Map'} mode={'card'}>
      <CheckinCalendarStack.Screen
        name={'Map'}
        component={MapScreen}
        options={{
          headerTitle: 'マップで見る',
        }}
      />
      <CheckinCalendarStack.Screen
        name={'CheckinsByDay'}
        component={CheckinsByDay}
        options={{
          headerTitle: '',
          headerLeft: BackButton,
        }}
      />
      <CheckinCalendarStack.Screen
        name={'UserProfile'}
        component={UserProfile}
        options={{
          headerTitle: 'ユーザープロフィール',
          headerLeft: BackButton,
          headerRight: ActionMenu,
        }}
      />
      <CheckinCalendarStack.Screen
        name={'CheckinDetail'}
        component={CheckinDetailScreen}
        options={{
          headerTitle: 'チェックインの詳細',
          headerLeft: BackButton,
        }}
      />
    </CheckinCalendarStack.Navigator>
  )
}
