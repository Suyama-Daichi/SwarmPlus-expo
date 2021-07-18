import { StyleSheet } from 'react-native'
import { COLORS } from '@/constants/Colors'

export const commonStyles = StyleSheet.create({
  bk_white: { backgroundColor: COLORS.light.background, height: '100%' },
  rowCenter: { flexDirection: 'row', alignItems: 'center' },
  textSub: { color: COLORS.light.textSub },
  venueName: { color: COLORS.light.textBlack },
  fontSmall: { fontSize: 11 },
  fontMedium: { fontSize: 17 },
})
