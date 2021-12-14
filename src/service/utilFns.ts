import { Checkin, FoursquareResponse, Icon, Photo } from '@/types/Foursquare'
import { CalendarEvent, RegionData } from '@/types/type'
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

export const unionArray = <T>(array: T[], key?: string) => {
  if (key) {
    return [...new Map(array.map((item) => [item[key], item])).values()] as T[]
  } else {
    return [...new Map(array.map((item) => [item, item])).values()] as T[]
  }
}

/** チェックインからリージョン情報を抽出する */
export const getRegions = (checkins: Checkin[]) => {
  const regions = checkins.map((m): RegionData => {
    return {
      id: m.id,
      title: m.venue.name,
      description: m.shout,
      createdAt: m.createdAt,
      latLng: { latitude: m.venue.location.lat, longitude: m.venue.location.lng },
      image: generateImageUrl(m.photos.items[0], 100),
    }
  })
  const firstRegion = {
    latitude: regions[0].latLng.latitude,
    longitude: regions[0].latLng.longitude,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  }

  return { regions, firstRegion }
}
