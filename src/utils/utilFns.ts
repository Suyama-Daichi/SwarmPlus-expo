import { Checkin, FoursquareResponse, Icon, Photo } from '@/types/Foursquare'
import { CalendarEvent } from '@/types/type'
import { getDateString } from './dateFns'
import 'react-native-url-polyfill/auto'

/**
 * チェックインデータをAgendaItemsオブジェクトに変換
 * @param checkins チェックインオブジェクト
 * @returns AgendaItems: object
 */
export const convertAgendaObject = (checkins: Checkin[]) => {
  const events = checkins.map((m) => {
    const dateStr = getDateString(m.createdAt)
    const { isMayor, like, id, likes, photos, posts, source, venue, createdAt } = m
    const event = {
      isMayor,
      like,
      id,
      likes,
      photos,
      posts,
      source,
      venue,
      createdAt,
      marked: true,
    }
    return [dateStr, event]
  })
  const calendarEvent = Object.fromEntries(events) as CalendarEvent
  return calendarEvent
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

export const unionArray = <T>(array: T[], key?: string) => {
  if (key) {
    return [...new Map(array.map((item) => [item[key], item])).values()] as T[]
  } else {
    return [...new Map(array.map((item) => [item, item])).values()] as T[]
  }
}
