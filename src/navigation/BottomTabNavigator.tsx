import { Ionicons } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import * as React from 'react'
import useColorScheme from '@/hooks/useColorScheme'
import { CheckinDetailScreen } from '@/components/pages/CheckinDetail/CheckinDetail'
import BackButton from '@/components/molecules/BackButton'

import { COLORS } from '@/constants/Colors'
import { BottomTabParamList, CheckinCalendarParamList, MapParamList } from '@/types'
import CheckinCalendar from '@/components/pages/CheckinCalendar/CheckinCalendar'
import ActionMenu from '@/components/ActionSheet'
import UserProfile from '@/components/pages/UserProfile'
import { useNavigation } from '@react-navigation/core'
import MapScreen from '@/components/pages/Map/Map'

const BottomTab = createBottomTabNavigator<BottomTabParamList>()

export default function BottomTabNavigator() {
  const navigation = useNavigation()
  React.useEffect(
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
        name="MapNavigator"
        component={MapNavigator}
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
const MapStack = createStackNavigator<MapParamList>()

function CheckinCalendarNavigator() {
  return (
    <CheckinCalendarStack.Navigator initialRouteName={'CheckinCalendar'} mode={'card'}>
      <CheckinCalendarStack.Screen
        name={'CheckinCalendar'}
        component={CheckinCalendar}
        options={{
          headerLeft: () => null,
          headerTitle: '??????????????????????????????',
        }}
      />

      <CheckinCalendarStack.Screen
        name={'UserProfile'}
        component={UserProfile}
        options={{
          headerTitle: '??????????????????????????????',
          headerLeft: BackButton,
          headerRight: ActionMenu,
        }}
      />

      <CheckinCalendarStack.Screen
        name={'CheckinDetail'}
        component={CheckinDetailScreen}
        options={{
          headerTitle: '???????????????????????????',
          headerLeft: BackButton,
        }}
      />
    </CheckinCalendarStack.Navigator>
  )
}

function MapNavigator() {
  return (
    <MapStack.Navigator initialRouteName={'Map'} mode={'card'}>
      <MapStack.Screen
        name={'Map'}
        component={MapScreen}
        options={{
          headerLeft: () => null,
          headerTitle: '??????????????????',
        }}
      />
      <MapStack.Screen
        name={'CheckinDetail'}
        component={CheckinDetailScreen}
        options={{
          headerTitle: '???????????????????????????',
          headerLeft: BackButton,
        }}
      />
    </MapStack.Navigator>
  )
}
