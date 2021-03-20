import { AgendaItemsMap, AgendaProps } from 'react-native-calendars'
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
    const agendaItems = Object.fromEntries(
      checkin.items.map((m) => [getDateString(m.createdAt), [m]])
    )
    return agendaItems
  }

  return { convertAgendaObject }
}
