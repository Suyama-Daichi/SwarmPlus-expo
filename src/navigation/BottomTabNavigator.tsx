import { Ionicons } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import * as React from 'react'
import useColorScheme from '@/hooks/useColorScheme'
import { CheckinDetailScreen } from '@/components/pages/CheckinDetail'
import BackButton from '@/components/molecules/BackButton'

import { COLORS } from '@/constants/Colors'
import { BottomTabParamList, CheckinSearchParamList } from '@/RouteParamList'
import ActionMenu from '@/components/ActionSheet'
import { UserProfile, MapScreen, CheckinSearch, SearchResult } from '@/components/pages'
import { useNavigation } from '@react-navigation/core'
import { useEffect } from 'react'

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
      initialRouteName="CheckinSearchNavigator"
      tabBarOptions={{ activeTintColor: COLORS[colorScheme].tint, showLabel: false }}
    >
      <BottomTab.Screen
        name="CheckinSearchNavigator"
        component={CheckinSearchNavigator}
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
const CheckinSearchStack = createStackNavigator<CheckinSearchParamList>()

function CheckinSearchNavigator() {
  return (
    <CheckinSearchStack.Navigator initialRouteName={'CheckinSearch'} mode={'card'}>
      <CheckinSearchStack.Screen
        name={'CheckinSearch'}
        component={CheckinSearch}
        options={{
          headerLeft: () => null,
          headerTitle: 'チェックイン検索',
        }}
      />
      <CheckinSearchStack.Screen
        name={'SearchResult'}
        component={SearchResult}
        options={{
          headerTitle: '',
          headerLeft: BackButton,
        }}
      />
      <CheckinSearchStack.Screen
        name={'UserProfile'}
        component={UserProfile}
        options={{
          headerTitle: 'ユーザープロフィール',
          headerLeft: BackButton,
          headerRight: ActionMenu,
        }}
      />
      <CheckinSearchStack.Screen
        name={'Map'}
        component={MapScreen}
        options={{
          headerLeft: BackButton,
          headerTitle: 'マップで見る',
        }}
      />
      <CheckinSearchStack.Screen
        name={'CheckinDetail'}
        component={CheckinDetailScreen}
        options={{
          headerTitle: 'チェックインの詳細',
          headerLeft: BackButton,
        }}
      />
    </CheckinSearchStack.Navigator>
  )
}
