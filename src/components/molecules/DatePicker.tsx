import React, { useState } from 'react'
import DP from 'react-native-date-picker'

type Props = {
  setCurrentDate: React.Dispatch<React.SetStateAction<Date>>
  showDatePickerState: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
}

const DatePicker = ({ setCurrentDate, showDatePickerState }: Props) => {
  const [showDatePicker, setShowDatePicker] = showDatePickerState

  const [datePickerDate, setDatePickerDate] = useState(new Date())

  return (
    <>
      <DP
        modal
        mode="date"
        open={showDatePicker}
        date={datePickerDate}
        onConfirm={(date) => {
          setShowDatePicker(false)
          setCurrentDate(date)
          setDatePickerDate(date)
        }}
        onCancel={() => {
          setShowDatePicker(false)
        }}
        locale={'ja-JP'}
        testID="dateTimePicker"
        minimumDate={new Date(2009, 2, 11)}
        maximumDate={new Date()}
        title={'日付を選んでください'}
        confirmText={'移動'}
        cancelText={'キャンセル'}
      />
    </>
  )
}

export default DatePicker
