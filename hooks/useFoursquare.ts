import { IStartEnd } from '../interface/interface.type'
import { config } from '../service/config'
import { Response, Checkins } from '../interface/Foursquare.type'

const getCredencial = () => {
  const params = { oauth_token: config().OAUTH_TOKEN, v: '20210301', limit: '250', locale: 'ja' }
  const query = new URLSearchParams(params)
  return query
}

const responseExtractor = async (res: any): Promise<Checkins> => {
  const parsedRes = await res.json()
  if (parsedRes.meta.code !== 200) {
    console.error({ error: 'failed', message: parsedRes.meta.errorDetail })
  }
  return parsedRes.response.checkins
}

export const useFoursquare = () => {
  /**
   * ユーザーのチェックインを取得
   * @param startEnd 日|月の始まりと末のタイムスタンプ
   * @returns チェックインのリスト
   */
  const fetchUserCheckins = (startEnd?: IStartEnd): Promise<Checkins> => {
    const params = getCredencial()
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
      .then(async (res) => await responseExtractor(res))
  }

  /**
   * チェックインの詳細を取得する
   * @param checkinId チェックインID
   * @returns チェックインの詳細
   */
  const fetchCheckinDetails = (checkinId: string) => {
    const params = getCredencial()
    return fetch(`https://api.foursquare.com/v2/checkins/${checkinId}?${params}`, {
      method: 'GET',
    })
      .catch((err) => {
        console.error(err)
      })
      .then(async (res) => await responseExtractor(res))
  }

  return { fetchUserCheckins, fetchCheckinDetails }
}