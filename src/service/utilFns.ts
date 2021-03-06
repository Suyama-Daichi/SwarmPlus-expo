import { Checkin, FoursquareResponse, Icon, Photo } from '@/types/Foursquare'
import { AgendaItemsMap } from 'react-native-calendars'
import { getDateString } from './dateFns'
import 'react-native-url-polyfill/auto'

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

/**
 * 画像URLを生成
 */
export const generateImageUrl = (photo: Photo | Icon, size: number | string = 'original') => {
  if (!photo) return
  return `${photo.prefix}${size}${photo.suffix}`
}

/**
 * 誰かとチェックインした場合、シャウトの末尾に付いてしまう「〇〇と一緒に」を取り除く
 */
export const removeShoutWith = (shout: string) => {
  const regObj = RegExp(/((— |.).*(と一緒に))/g)
  return shout.replace(regObj, '')
}

/**
 * URLのパラメータから指定のキーの値を取得する
 * @param rawUrl 対象のURL
 * @param key 取得したいパラメータのキー
 * @returns 取得した値
 */
export const parseURLParams = (rawUrl: string, key: string) => {
  const url = new URL(rawUrl)
  const params = url.searchParams

  if (params.has(key)) {
    return params.get(key)
  }
}

type Props = {
  res: void | Response
  type: 'checkins' | 'checkin' | 'user'
}

export const responseExtractor = async <T>({ res, type }: Props): Promise<T> => {
  const parsedRes = (await (res as Response).json()) as FoursquareResponse
  if (parsedRes.meta.code !== 200) {
    console.error({ error: 'failed', message: parsedRes.meta.errorDetail })
  }
  return parsedRes.response[type] as unknown as T
}
