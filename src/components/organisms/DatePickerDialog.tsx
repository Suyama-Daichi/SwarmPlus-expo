import DatePicker from '@/components/molecules/DatePicker'
import React, { Dispatch, SetStateAction } from 'react'
import { View, StyleSheet, Platform } from 'react-native'
import Modal from 'react-native-modal'

type Props = {
  setCurrentDate: Dispatch<SetStateAction<Date>>
  showDatePicker: boolean
  hideDatePicker: () => void
}

const DatePickerDialog = ({ setCurrentDate, showDatePicker, hideDatePicker }: Props) => {
  const platform = Platform.OS
  return platform === 'ios' ? (
    <Modal isVisible={showDatePicker} onBackdropPress={hideDatePicker}>
      <View style={{ backgroundColor: 'white' }}>
        <DatePicker setCurrentDate={setCurrentDate} showToolbar={true} />
      </View>
    </Modal>
  ) : showDatePicker ? (
    <DatePicker setCurrentDate={setCurrentDate} showToolbar={false} />
  ) : (
    <></>
  )
}

export default DatePickerDialog

const styles = StyleSheet.create({})
