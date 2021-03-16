import { format } from 'date-fns'

export const useDate = () => {
  /**
   * Dateオブジェクトを日付文字列に変換する
   * @param date 変換対象のDateオブジェクト
   * @returns 日付文字列 ex: 2020-03-12
   */
  const getDateString = (date = new Date()) => {
    return format(date, 'yyyy-MM-dd')
  }
  return {
    getDateString,
  }
}
