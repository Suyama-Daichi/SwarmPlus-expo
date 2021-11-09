import React, { useState } from 'react'
import DateTimePicker from '@react-native-community/datetimepicker'
import ToolBar from './ToolBar'

type Props = {
  setCurrentDate: React.Dispatch<React.SetStateAction<Date | undefined>>
}

const DatePicker = ({ setCurrentDate }: Props) => {
  const [datePickerDate, setDatePickerDate] = useState<Date>(new Date())

  return (
    <>
      <ToolBar buttons={[{ label: '検索', onPress: () => setCurrentDate(datePickerDate) }]} />
      <DateTimePicker
        locale={'ja-JP'}
        testID="dateTimePicker"
        value={datePickerDate}
        mode={'date'}
        is24Hour={true}
        display={'spinner'}
        onChange={(_, date: Date) => setDatePickerDate(date)}
        maximumDate={new Date()}
      />
    </>
  )
}

export default DatePicker
