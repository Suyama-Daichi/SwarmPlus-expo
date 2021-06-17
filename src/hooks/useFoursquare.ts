import { IStartEnd } from '../types/type'
import { config } from '../service/config'
import type { Checkins, User, Checkin, FoursquareResponse } from '../types/Foursquare'
import { useCache } from './useCache'

const getCredential = () => {
  const params = { oauth_token: config().OAUTH_TOKEN, v: '20210301', limit: '250', locale: 'ja' }
  const query = new URLSearchParams(params)
  return query
}

const responseExtractor = async <T>({
  res,
  type,
}: {
  res: Response | void
  type: 'checkins' | 'checkin' | 'user'
}): Promise<T> => {
  const parsedRes = (await (res as Response).json()) as FoursquareResponse
  if (parsedRes.meta.code !== 200) {
    console.error({ error: 'failed', message: parsedRes.meta.errorDetail })
  }
  return parsedRes.response[type] as unknown as T
}

export const useFoursquare = () => {
  const { checkCache } = useCache()

  const fetchUser = (): Promise<User> => {
    const params = getCredential()
    return fetch(`https://api.foursquare.com/v2/users/self?${params.toString()}`, {
      method: 'GET',
    })
      .catch((err) => {
        console.error(err)
      })
      .then(async (res) => await responseExtractor<User>({ res, type: 'user' }))
  }

  /**
   * ユーザーのチェックインを取得
   * @param startEnd 日|月の始まりと末のタイムスタンプ
   * @returns チェックインのリスト
   */
  const fetchUserCheckins = (startEnd?: IStartEnd): Promise<Checkins> => {
    const params = getCredential()
    if (startEnd) {
      params.append('afterTimestamp', startEnd.afterTimestamp)
      params.append('beforeTimestamp', startEnd.beforeTimestamp)
    }
    return checkCache<Checkins>(
      `https://api.foursquare.com/v2/users/self/checkins?${params.toString()}`,
      'GET',
      'checkins'
    )
  }

  /**
   * チェックインの詳細を取得する
   * @param checkinId チェックインID
   * @returns チェックインの詳細
   */
  const fetchCheckinDetails = (checkinId: string): Promise<Checkin> => {
    const params = getCredential()
    return checkCache<Checkin>(
      `https://api.foursquare.com/v2/checkins/${checkinId}?${params.toString()}`,
      'GET',
      'checkin'
    )
  }

  return { fetchUser, fetchUserCheckins, fetchCheckinDetails }
}
