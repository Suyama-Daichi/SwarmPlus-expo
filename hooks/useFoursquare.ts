import { IStartEnd } from '../interface/interface.type'
import { config } from '../service/config'

const getCredencial = () => {
  const params = { oauth_token: config().OAUTH_TOKEN, v: '20210301', limit: '250' }
  const query = new URLSearchParams(params)
  return query
}

const responseExtractor = async (res: any) => {
  return (await res.json()).response
}

export const useFoursquare = () => {
  /**
   * ユーザーのチェックインを取得
   * @param startEnd 月の始まりと月末のタイムスタンプ
   * @returns チェックインのリスト
   */
  const fetchUserCheckins = (startEnd?: IStartEnd) => {
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

  return { fetchUserCheckins }
}
