import DatePicker from '@/components/molecules/DatePicker'
import React, { Dispatch, SetStateAction } from 'react'
import { StyleSheet } from 'react-native'

type Props = {
  setCurrentDate: Dispatch<SetStateAction<Date>>
  showDatePickerState: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
}

const DatePickerDialog = ({ setCurrentDate, showDatePickerState }: Props) => {
  return <DatePicker showDatePickerState={showDatePickerState} setCurrentDate={setCurrentDate} />
}

export default DatePickerDialog

const styles = StyleSheet.create({})
