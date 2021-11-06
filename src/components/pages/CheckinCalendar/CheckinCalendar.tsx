import React, { useState } from 'react'
import { ActivityIndicator } from 'react-native'
import { CalendarList } from 'react-native-calendars'
import { useInitialize } from '@/hooks/useInitialize'
import CalendarHeader from '@/components/organisms/CalendarHeader'
import FAB from '@/components/molecules/FAB'
import { useCheckinCalendar } from './useCheckinCalendar'

const CheckinCalendar = () => {
  const { loading } = useInitialize()
  const { calendarEvent, init: fetchCheckins } = useCheckinCalendar()
  const [currentDate, setCurrentDate] = useState<Date>()

  if (loading) return <ActivityIndicator />

  return (
    <>
      <CalendarList
        horizontal={true}
        pagingEnabled={true}
        // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
        minDate={'2012-05-10'}
        // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
        maxDate={new Date()}
        // Handler which gets executed on day press. Default = undefined
        onDayPress={(day) => {
          console.log('selected day', day)
        }}
        // Handler which gets executed on day long press. Default = undefined
        onDayLongPress={(day) => {
          console.log('selected day', day)
        }}
        // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
        monthFormat={'yyyy MM'}
        // Handler which gets executed when visible month changes in calendar. Default = undefined
        onMonthChange={(month) => {
          console.log('month changed', month)
        }}
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
          return <CalendarHeader date={date} setCurrentDate={setCurrentDate} />
        }}
        markedDates={calendarEvent}
      />
      <FAB name={'sync'} label={['更新']} solid={true} onPress={() => fetchCheckins(currentDate)} />
    </>
  )
}

export default CheckinCalendar
