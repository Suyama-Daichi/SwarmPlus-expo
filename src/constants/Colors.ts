const tintColorLight = '#FFB049'
const tintColorDark = '#FFB049'

export const COLORS: Color = {
  light: {
    primaryOrange: '#FFB049',
    textBlack: '#333333',
    textSub: '#777777',
    coinCrown: '#FFE600',
    pink: '#FF8EE6',
    background: '#fff',
    backgroundSecond: '#DADADA',
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
  },
  dark: {
    primaryOrange: '#FFB049',
    textBlack: '#333333',
    textSub: '#777777',
    coinCrown: '#FFE600',
    pink: '#FF8EE6',
    background: '#fff',
    backgroundSecond: '#DADADA',
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
  },
  common: {
    primaryOrange: '#FFB049',
    textSub: '#777777',
  },
}

export type CommonColor = {
  primaryOrange: string
  textBlack: string
  textSub: string
  coinCrown: string
  pink: string
  background: string
  backgroundSecond: string
  tint: string
  tabIconDefault: string
  tabIconSelected: string
}
type Color = {
  light: CommonColor
  dark: CommonColor
  common: Partial<CommonColor>
}
