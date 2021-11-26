import React, { useState, useMemo } from 'react'
import { ActivityIndicator } from 'react-native'
import { CalendarList } from 'react-native-calendars'
import { useInitialize } from '@/hooks/useInitialize'
import FAB from '@/components/molecules/FAB'
import { dateObj2Date } from '@/service/dateFns'
import { useNavigation } from '@/hooks/useNavigation'
import { useCheckin } from '@/hooks/useCheckin'
import { useCheckinCalendar } from './useCheckinCalendar'
import DatePicker from '../../molecules/DatePicker'

const CheckinCalendar = () => {
  const navigation = useNavigation()
  const { loading: loadingInit } = useInitialize()
  const { fetchCheckinsSoft, fetchCheckinsHard } = useCheckin()
  const { calendarEvent, fetchCheckins, loading } = useCheckinCalendar()
  const [currentDate, setCurrentDate] = useState<Date>(new Date())
  const maxDate = useMemo(() => new Date(), [])

  if (loadingInit) return <ActivityIndicator />
  return (
    <>
      <CalendarList
        displayLoadingIndicator={loading}
        pastScrollRange={240}
        futureScrollRange={0}
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
        monthFormat={'yyyy / MM'}
        onVisibleMonthsChange={(date) => {
          const currentDate = dateObj2Date(date[0])
          date.length === 1 && fetchCheckins(currentDate, fetchCheckinsSoft)
          setCurrentDate(currentDate)
        }}
        // Hide month navigation arrows. Default = false
        hideArrows={false}
        disableArrowRight={currentDate.getTime() > maxDate.getTime()}
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
        markedDates={calendarEvent}
      />
      <DatePicker setCurrentDate={setCurrentDate} />
      <FAB
        name={'sync'}
        label={['更新']}
        solid={true}
        onPress={() => fetchCheckins(currentDate, fetchCheckinsHard)}
      />
    </>
  )
}

export default CheckinCalendar
