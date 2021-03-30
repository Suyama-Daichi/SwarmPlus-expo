import {
  format,
  startOfMonth,
  endOfMonth,
  startOfDay,
  endOfDay,
  getUnixTime,
  eachDayOfInterval,
  addDays,
  min,
  max,
} from 'date-fns'
import { DateObject } from 'react-native-calendars'
import { IStartEnd } from '../interface/interface.type'

export const useDate = () => {
  /**
   * Dateオブジェクトを日付文字列に変換する
   * @param date 変換対象のDateオブジェクト
   * @returns 日付文字列 ex: 2020-03-12
   */
  const getDateString = (date: Date | number = new Date()) => {
    const formatString = 'yyyy-MM-dd'
    return format(typeof date === 'number' ? new Date(Number(date + '000')) : date, formatString)
  }

  /**
   * タイムスタンプ(10桁)をフォーマットする
   * @param timestamp タイムスタンプ
   * @param formatString 日付フォーマット
   * @returns フォーマットされた文字列
   */
  const formatTimestamp = (timestamp: number, formatString: string) => {
    return format(new Date(Number(timestamp + '000')), formatString)
  }

  /**
   * 月の始まりと月末のタイムスタンプを取得する
   * @param dateObject DateObject
   * @returns IStartEnd
   */
  const getStartEndOfMonth = (dateObject?: DateObject): IStartEnd => {
    const afterTimestamp = startOfMonth(
      dateObject ? new Date(dateObject.year, dateObject.month - 1) : new Date()
    )
    const beforeTimestamp = endOfMonth(
      dateObject ? new Date(dateObject.year, dateObject.month) : new Date()
    )
    return {
      afterTimestamp: getUnixTime(afterTimestamp).toString(),
      beforeTimestamp: getUnixTime(beforeTimestamp).toString(),
    }
  }

  /**
   * 日の始まりと終わりのタイムスタンプを取得する
   * @param dateObject DateObject
   * @returns IStartEnd
   */
  const getStartEndOfDay = (dateObject?: DateObject): IStartEnd => {
    const afterTimestamp = startOfDay(
      dateObject ? new Date(dateObject.year, dateObject.month - 1, dateObject.day) : new Date()
    )
    const beforeTimestamp = endOfDay(
      dateObject ? new Date(dateObject.year, dateObject.month - 1, dateObject.day) : new Date()
    )
    return {
      afterTimestamp: getUnixTime(afterTimestamp).toString(),
      beforeTimestamp: getUnixTime(beforeTimestamp).toString(),
    }
  }

  /**
   * 指定した期間の日付の配列を取得する
   * @param start 開始日
   * @param end 終了日
   * @returns []: string
   */
  const getDateArray = (start: Date = new Date(), end: Date = addDays(new Date(), 7)) => {
    const dateArray = eachDayOfInterval({ start, end })
    return dateArray.map((m) => getDateString(m))
  }

  /**
   * 最小日、最大日を取得する
   * @param dateArray 比較対象の日付の配列: Date[]
   * @returns {min: Date, Max: Date}
   */
  const getMinMaxDate = (dateArray: Date[] | string[]) => {
    if (typeof dateArray[0] === 'string') {
      const dateConverted = dateArray.map((m) => new Date(m))
      return { min: min(dateConverted), max: max(dateConverted) }
    } else {
      return { min: min(dateArray as Date[]), max: max(dateArray as Date[]) }
    }
  }

  return {
    getDateString,
    formatTimestamp,
    getStartEndOfMonth,
    getStartEndOfDay,
    getDateArray,
    getMinMaxDate,
  }
}
