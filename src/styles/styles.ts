import { StyleSheet } from 'react-native'
import { COLORS } from '@/constants/Colors'

export const other = StyleSheet.create({
  bk_white: { backgroundColor: COLORS.light.background, height: '100%' },
  rowCenter: { flexDirection: 'row', alignItems: 'center' },
})

export const fontSize = StyleSheet.create({
  fontSmall: { fontSize: 11 },
  fontMedium: { fontSize: 17 },
  fontLarge: { fontSize: 24 },
})

export const fontColor = StyleSheet.create({
  textSub: { color: COLORS.light.textSub },
  venueName: { color: COLORS.light.textBlack },
})
