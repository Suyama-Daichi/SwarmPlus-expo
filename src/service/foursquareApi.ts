import { AccessToken, IStartEnd as IPeriod } from '@/types/type'
import type { Response, CheckinDetail, FoursquareResponse, Checkin } from '@/types/Foursquare'
import { config } from '@/service/config'
import { FOURSQUARE_ACCESS_TOKEN } from '@/constants/StorageKeys'
import storage from '@/service/reactNativeStorage'
import { responseExtractor } from './utilFns'

const getBaseParams = async () => {
  const oauthToken = await storage.load<string>({ key: FOURSQUARE_ACCESS_TOKEN })
  const params = {
    oauth_token: oauthToken,
    v: '20211123',
    locale: 'ja',
    mode: 'swarm',
  }
  const query = new URLSearchParams(params)
  return query
}

/** ユーザー情報を取得 */
export const fetchUser = async (userId?: string) => {
  const params = await getBaseParams()
  return await fetch(
    `https://api.foursquare.com/v2/users/${userId || 'self'}?${params.toString()}`,
    {
      method: 'GET',
    }
  )
    .catch((err) => {
      console.error(err)
      return undefined
    })
    .then(async (r) => r && ((await r.json()) as FoursquareResponse))
    .then((t) => t && t.response.user)
}

/**
 * ユーザーのチェックインを取得
 * @param period 日|月の始まりと末のタイムスタンプ
 * @returns チェックインのリスト
 */
export const fetchUserCheckins = async ({
  period: initialPeriod,
  offset,
  limit = 250,
}: {
  period: IPeriod
  offset?: number
  limit?: number
}) => {
  const fetchData = async (period: IPeriod = initialPeriod) => {
    const params = await getBaseParams()
    period?.afterTimestamp && params.append('afterTimestamp', period.afterTimestamp.toString())
    period?.beforeTimestamp && params.append('beforeTimestamp', period.beforeTimestamp.toString())
    offset && params.append('offset', offset.toString())
    limit && params.append('limit', limit.toString())

    console.log(`https://api.foursquare.com/v2/users/self/checkins?${params.toString()}`)

    const res = await fetch(
      `https://api.foursquare.com/v2/users/self/checkins?${params.toString()}`,
      {
        method: 'GET',
      }
    )
      .catch((err) => console.error(err))
      .then(async (res) => {
        if (!res) return []
        const response = (await res.json()) as FoursquareResponse
        return response.response.checkins ? response.response.checkins.items : []
      })
    return res
  }
  const result = await fetchData(initialPeriod)
  if (result.length < 250) return result
  while (result.length < 751) {
    const res = await fetchData({
      beforeTimestamp: result[result.length - 1].createdAt - 1,
      afterTimestamp: initialPeriod.afterTimestamp,
    })
    if (res.length === 0) break
    result.push(...res)
  }
  return result
}

/**
 * チェックインの詳細を取得する
 * @param checkinId チェックインID
 * @returns チェックインの詳細
 */
export const fetchCheckinDetails = async (checkinId: string): Promise<CheckinDetail> => {
  const params = await getBaseParams()

  return await fetch(`https://api.foursquare.com/v2/checkins/${checkinId}?${params.toString()}`, {
    method: 'GET',
  })
    .catch((err) => console.error(err))
    .then(async (res) => await responseExtractor<CheckinDetail>({ res, type: 'checkin' }))
}

/**
 * ユーザーのFoursquareアクセストークン(OauthToken)を取得
 * @param code コード
 * @returns アクセストークン
 */
export const fetchAccessToken = async (code: string) => {
  const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } = config()

  const request = await fetch(
    `https://foursquare.com/oauth2/access_token?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&grant_type=authorization_code&redirect_uri=${REDIRECT_URI}&code=${code}`,
    { method: 'GET' }
  )

  return (await (request.json() as Promise<AccessToken>)).access_token
}
