import { IStartEnd } from '../interface/interface.type'
import { config } from '../service/config'
import { Checkins, User, CheckinsItem, Checkin } from '../interface/Foursquare.type'

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
  const parsedRes = (await (res as Response).json()) as Checkin
  if (parsedRes.meta.code !== 200) {
    console.error({ error: 'failed', message: parsedRes.meta.errorDetail })
  }
  return parsedRes.response[type] as unknown as T
}

export const useFoursquare = () => {
  const fetchUser = (): Promise<User> => {
    const params = getCredential()
    return fetch(`https://api.foursquare.com/v2/users/self?${params}`, {
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
    return fetch(`https://api.foursquare.com/v2/users/self/checkins?${params}`, {
      method: 'GET',
    })
      .catch((err) => {
        console.error(err)
      })
      .then(async (res) => await responseExtractor<Checkins>({ res, type: 'checkins' }))
  }

  /**
   * チェックインの詳細を取得する
   * @param checkinId チェックインID
   * @returns チェックインの詳細
   */
  const fetchCheckinDetails = (checkinId: string): Promise<CheckinsItem> => {
    const params = getCredential()
    return fetch(`https://api.foursquare.com/v2/checkins/${checkinId}?${params}`, {
      method: 'GET',
    })
      .catch((err) => {
        console.error(err)
      })
      .then(async (res) => await responseExtractor<CheckinsItem>({ res, type: 'checkin' }))
  }

  return { fetchUser, fetchUserCheckins, fetchCheckinDetails }
}
