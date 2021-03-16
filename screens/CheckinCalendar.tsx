import * as React from 'react'
import { View } from 'react-native'
import { LocaleConfig, Agenda } from 'react-native-calendars'

export default function CheckinCalander() {
  /**
   * 月ごとのチェックインを取得する
   * @param month date-string
   */
  const fetchCheckinForMonth = (month: string) => {}
  /**
   * 日ごとのチェックインを取得する
   * @param day date-string
   */
  const fetchCheckinForDay = (day: string) => {}

  return (
    <View style={{ height: 600 }}>
      <Agenda
        items={{
          '2020-05-22': [{ name: 'item 1 - any js object' }],
          '2020-05-23': [{ name: 'item 2 - any js object', height: 20 }],
          '2020-05-24': [],
          '2020-05-25': [{ name: 'item 3 - any js object' }, { name: 'any js object' }],
        }}
        loadItemsForMonth={(month) => {
          fetchCheckinForMonth(month.dateString)
        }}
        onDayPress={(day) => {
          fetchCheckinForDay(day.dateString)
        }}
      />
    </View>
  )
}

LocaleConfig.locales.jp = {
  monthNames: [
    '1月',
    '2月',
    '3月',
    '4月',
    '5月',
    '6月',
    '7月',
    '8月',
    '9月',
    '10月',
    '11月',
    '12月',
  ],
  monthNamesShort: [
    '1月',
    '2月',
    '3月',
    '4月',
    '5月',
    '6月',
    '7月',
    '8月',
    '9月',
    '10月',
    '11月',
    '12月',
  ],
  dayNames: ['日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日'],
  dayNamesShort: ['日', '月', '火', '水', '木', '金', '土'],
}
LocaleConfig.defaultLocale = 'jp'
