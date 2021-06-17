import { StyleSheet } from 'react-native'
import colors from '../constants/Colors'

export const commonStyles = StyleSheet.create({
  bk_white: { backgroundColor: colors.light.background, height: '100%' },
  rowCenter: { flexDirection: 'row', alignItems: 'center' },
  textSub: { color: colors.light.textSub },
  venueName: { color: colors.light.textBlack },
  fontSmall: { fontSize: 11 },
  fontMedium: { fontSize: 17 },
})
