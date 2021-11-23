import React, { useState, useCallback, useMemo } from 'react'
import { ActivityIndicator } from 'react-native'
import { CalendarList } from 'react-native-calendars'
import { useInitialize } from '@/hooks/useInitialize'
import CalendarHeader from '@/components/organisms/CalendarHeader'
import FAB from '@/components/molecules/FAB'
import { dateObj2Date } from '@/service/dateFns'
import { useNavigation } from '@/hooks/useNavigation'
import { useLoading } from '@/hooks/useLoading'
import { useCheckinCalendar } from './useCheckinCalendar'
import DatePicker from '../../molecules/DatePicker'

const CheckinCalendar = () => {
  const navigation = useNavigation()
  const { loading: loadingInit } = useInitialize()
  const { calendarEvent, init: fetchCheckins, fetchCheckinsHard } = useCheckinCalendar()
  const [currentDate, setCurrentDate] = useState<Date>(new Date())
  const maxDate = useMemo(() => new Date(), [])
  const { loading, enableLoading, disableLoading } = useLoading()

  const fetch = useCallback(
    (currentDate: Date) => {
      enableLoading()
      fetchCheckins(currentDate).then(() => {
        disableLoading()
      })
    },
    [fetchCheckins]
  )

  if (loadingInit) return <ActivityIndicator />
  return (
    <>
      <CalendarList
        displayLoadingIndicator={loading}
        pastScrollRange={240}
        current={currentDate}
        horizontal={true}
        pagingEnabled={true}
        // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
        minDate={'2012-05-10'}
        // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
        maxDate={maxDate}
        // Handler which gets executed on day press. Default = undefined
        onDayPress={(day) => {
          navigation.navigate('CheckinsByDay', { dateObject: day })
        }}
        // Handler which gets executed on day long press. Default = undefined
        onDayLongPress={(day) => {
          console.log('selected day', day)
        }}
        // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
        monthFormat={'yyyy MM'}
        onVisibleMonthsChange={(date) => date.length === 1 && fetch(dateObj2Date(date[0]))}
        // Hide month navigation arrows. Default = false
        hideArrows={false}
        // Do not show days of other months in month page. Default = false
        hideExtraDays={true}
        // If hideArrows = false and hideExtraDays = false do not switch month when tapping on greyed out
        // day from another month that is visible in calendar page. Default = false
        disableMonthChange={true}
        // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday
        firstDay={0}
        // Handler which gets executed when press arrow icon left. It receive a callback can go back month
        onPressArrowLeft={(subtractMonth) => subtractMonth()}
        // Handler which gets executed when press arrow icon right. It receive a callback can go next month
        onPressArrowRight={(addMonth) => addMonth()}
        // Replace default month and year title with custom one. the function receive a date as parameter
        renderHeader={(date) => {
          return <CalendarHeader date={date} />
        }}
        markedDates={calendarEvent}
      />
      <DatePicker setCurrentDate={setCurrentDate} />
      <FAB
        name={'sync'}
        label={['更新']}
        solid={true}
        onPress={() => fetchCheckinsHard(currentDate)}
      />
    </>
  )
}

export default CheckinCalendar
