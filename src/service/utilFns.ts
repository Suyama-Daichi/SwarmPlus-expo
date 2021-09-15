import { Checkin } from '@/types/Foursquare'
import { AgendaItemsMap } from 'react-native-calendars'
import { getDateString } from './dateFns'

/**
 * チェックインデータをAgendaItemsオブジェクトに変換
 * @param checkins チェックインオブジェクト
 * @returns AgendaItems: object
 */
export const convertAgendaObject = (checkins: Checkin[]): AgendaItemsMap<Checkin> => {
  type GroupBy = { date: string; checkins: Checkin[] }
  //groupBy
  const groupBy = checkins.reduce((result: GroupBy[], current) => {
    // 同日のチェックインがあるか
    const element = result.find((checkin) => {
      return checkin.date === getDateString(current.createdAt)
    })
    if (element) {
      //ある時（下記、初期データを操作）
      element.checkins.push(current)
    } else {
      //無いとき（新規に初期データを作成）
      result.push({
        date: getDateString(current.createdAt),
        checkins: [current],
      })
    }
    return result
  }, [])

  // AgendaObjectに変換
  // ex: { "2021-03-05" : Checkin[]}
  const agendaObject = groupBy.reduce((a, b) => ({ ...a, [b.date]: b.checkins }), {})

  return agendaObject
}
