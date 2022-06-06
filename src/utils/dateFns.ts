/* eslint-disable @typescript-eslint/restrict-plus-operands */
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfDay,
  endOfDay,
  getUnixTime,
  eachDayOfInterval,
  min,
  max,
  formatDistanceToNow,
  addDays,
  addMonths,
} from 'date-fns'
import { LocaleConfig } from 'react-native-calendars'
import { ja } from 'date-fns/locale'
import { IStartEnd } from '@/types/type'

/**
 * Dateオブジェクトを日付文字列に変換する
 * @param date 変換対象のDateオブジェクト
 * @returns 日付文字列 ex: 2020-03-12
 */
export const getDateString = (date: Date | number = new Date(), formatString = 'yyyy-MM-dd') => {
  return format(
    typeof date === 'number' ? new Date(Number(date + '000')) : new Date(date),
    formatString,
    { locale: ja }
  )
}

export const date2Timestamp = (date: Date) => {
  return Math.round(date.getTime() / 1000)
}

/**
 * DateObjectをDateに変換する
 * @param dateObj 変換対象のDateオブジェクト
 * @returns Dateオブジェクト
 */
export const dateObj2Date = (dateObj: DateObject) => {
  return new Date(dateObj.timestamp)
}

/**
 * タイムスタンプ(10桁)をフォーマットする
 * @param timestamp タイムスタンプ
 * @param formatString 日付フォーマット
 * @returns フォーマットされた文字列
 */
export const formatTimestamp = (timestamp: number | undefined, formatString: string) => {
  if (!timestamp) return
  return format(new Date(Number(timestamp + '000')), formatString, { locale: ja })
}

/**
 * タイムスタンプ(10桁)をDateに変換する
 * @param timestamp タイムスタンプ
 * @param date 日付フォーマット
 * @returns フォーマットされた文字列
 */
export const timestamp2Date = (timestamp?: number) => {
  if (!timestamp) return
  if (timestamp > 999999999999) {
    return new Date(Number(timestamp))
  } else {
    return new Date(Number(timestamp + '000'))
  }
}

/**
 * 月の始まりと月末のタイムスタンプを取得する
 * @param date DateObject
 * @returns IStartEnd
 */
export const getStartEndOfMonth = (date?: Date): IStartEnd => {
  const afterTimestamp = startOfMonth(date || new Date())
  const beforeTimestamp = endOfMonth(date || new Date())
  return {
    afterTimestamp: getUnixTime(afterTimestamp),
    beforeTimestamp: getUnixTime(beforeTimestamp),
  }
}

/**
 * 日の始まりと終わりのタイムスタンプを取得する
 * @param dateObject DateObject
 * @returns IStartEnd
 */
export const getStartEndOfDay = (dateObject?: DateObject): IStartEnd => {
  const afterTimestamp = startOfDay(
    dateObject ? new Date(dateObject.year, dateObject.month - 1, dateObject.day) : new Date()
  )
  const beforeTimestamp = endOfDay(
    dateObject ? new Date(dateObject.year, dateObject.month - 1, dateObject.day) : new Date()
  )
  return {
    afterTimestamp: getUnixTime(afterTimestamp),
    beforeTimestamp: getUnixTime(beforeTimestamp),
  }
}

/**
 * 指定した期間の日付の配列を取得する
 * @param start 開始日
 * @param end 終了日
 * @returns []: string
 */
export const getDateArray = (start: Date = new Date(), end: Date = addDays(new Date(), 7)) => {
  const dateArray = eachDayOfInterval({ start, end })
  return dateArray.map((m) => getDateString(m))
}

export const addMonth = (date: Date) => {
  return addMonths(date, 1)
}

/**
 * 最小日、最大日を取得する
 * @param dateArray 比較対象の日付の配列: Date[]
 * @returns {min: Date, Max: Date}
 */
export const getMinMaxDate = (dateArray: Date[] | string[]) => {
  if (typeof dateArray[0] === 'string') {
    const dateConverted = dateArray.map((m) => new Date(m))
    return { min: min(dateConverted), max: max(dateConverted) }
  } else {
    return { min: min(dateArray as Date[]), max: max(dateArray as Date[]) }
  }
}

/**
 * n|時間|日|月前を作る
 * @param {Date | undefined} Dateオブジェクト
 */
export const formatDistanceToNowForTimestamp = (date: Date | undefined) => {
  if (!date) return
  return formatDistanceToNow(date, { addSuffix: true, locale: ja })
}

/**
 * 曜日を取得する
 * @param {Date} Dateオブジェクト
 */
export const getDay = (date: Date | undefined) => {
  if (!date || !LocaleConfig.locales.jp.dayNamesShort) return
  const day = LocaleConfig.locales.jp.dayNamesShort[date.getDay()]
  return day
}
