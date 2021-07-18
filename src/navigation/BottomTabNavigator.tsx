import { Ionicons } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import * as React from 'react'
import useColorScheme from '@/hooks/useColorScheme'
import { CheckinDetailScreen } from '@/components/pages/CheckinDetail'
import HeaderBack from '@/components/Header/HeaderBack.component'

import { COLORS } from '@/constants/Colors'
import { BottomTabParamList, CheckinCalendarParamList } from '@/types'
import CheckinCalender from '@/components/pages/CheckinCalendar'
import HeaderRightIcon from '@/components/Header/HeaderRightIcon.component'
import ActionMenu from '@/components/ActionSheet'
import UserProfile from '@/components/pages/UserProfile'

const BottomTab = createBottomTabNavigator<BottomTabParamList>()

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme()

  return (
    <BottomTab.Navigator
      initialRouteName="CheckinCalender"
      tabBarOptions={{ activeTintColor: COLORS[colorScheme].tint, showLabel: false }}
    >
      <BottomTab.Screen
        name="CheckinCalender"
        component={CheckinCalendarNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="calendar" color={color} />,
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
        component={CheckinCalender}
        options={{
          headerTitle: 'カレンダーで振り返る',
          headerLeft: () => null,
          headerRight: () => (
            <HeaderRightIcon
              page={'UserProfile'}
              iconName={'person-circle'}
              color={COLORS.common.textSub}
            />
          ),
        }}
      />

      <CheckinCalendarStack.Screen
        name={'UserProfile'}
        component={UserProfile}
        options={{
          headerTitle: 'ユーザープロフィール',
          headerLeft: HeaderBack,
          headerRight: ActionMenu,
        }}
      />

      <CheckinCalendarStack.Screen
        name={'CheckinDetail'}
        component={CheckinDetailScreen}
        options={{
          headerTitle: 'チェックインの詳細',
          headerLeft: HeaderBack,
        }}
      />
    </CheckinCalendarStack.Navigator>
  )
}
