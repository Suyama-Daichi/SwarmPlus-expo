import { format, startOfMonth, endOfMonth, getUnixTime } from 'date-fns'
import { DateObject } from 'react-native-calendars'
import { IStartEnd } from '../interface/interface.type'

export const useDate = () => {
  /**
   * Dateオブジェクトを日付文字列に変換する
   * @param date 変換対象のDateオブジェクト
   * @returns 日付文字列 ex: 2020-03-12
   */
  const getDateString = (date = new Date()) => {
    return format(date, 'yyyy-MM-dd')
  }

  /**
   * 月の始まりと月末のタイムスタンプを取得する
   * @param dateObject 月
   * @returns IStartEnd
   */
  const getStartEndOfMonth = (dateObject?: DateObject): IStartEnd => {
    const afterTimestamp = startOfMonth(
      dateObject ? new Date(dateObject.year, dateObject.month - 1) : new Date()
    )
    const beforeTimestamp = endOfMonth(
      dateObject ? new Date(dateObject.year, dateObject.month - 1) : new Date()
    )
    return {
      afterTimestamp: getUnixTime(afterTimestamp).toString(),
      beforeTimestamp: getUnixTime(beforeTimestamp).toString(),
    }
  }

  return {
    getDateString,
    getStartEndOfMonth,
  }
}
