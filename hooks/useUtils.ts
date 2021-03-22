import { Checkins } from '../interface/Foursquare.type'
import { useDate } from '../hooks/useDate'

export const useUtils = () => {
  const { getDateString } = useDate()

  /**
   * チェックインデータをAgendaItemsオブジェクトに変換
   * @param checkin チェックインオブジェクト
   * @returns AgendaItems: object
   */
  const convertAgendaObject = (checkin: Checkins) => {
    const hoge = checkin.items.reduce((result, current) => {
      const currentDateStr = getDateString(current.createdAt)
      const exist = result.find((f) => {
        return f.currentDateStr === currentDateStr
      })
      if (exist) {
        exist.current.push(current)
      } else {
        result.push({ currentDateStr, current: [current] })
      }
      return result
    }, [])

    return Object.fromEntries(hoge.map((m) => [m.currentDateStr, m.current]))
  }

  /**
   * 画像URLを生成
   * @param checkin チェックインオブジェクト
   * @returns AgendaItems: object
   */
  const generateImageUrl = (prefix: string, surfix: string, size: string = 'original') => {
    return `${prefix}${size}${surfix}`
  }

  return { convertAgendaObject, generateImageUrl }
}
