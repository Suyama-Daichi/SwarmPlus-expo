import { AccessToken } from '@/types/type'
import type { CheckinDetail, FoursquareResponse, Checkin } from '@/types/Foursquare'
import { config } from '@/service/config'
import { responseExtractor } from './utilFns'

const getBaseParams = () => {
  const params = {
    v: '20211123',
    locale: 'ja',
    mode: 'swarm',
  }
  const query = new URLSearchParams(params)
  return query
}

/** ユーザー情報を取得 */
export const fetchUser = async (token: string, userId?: string) => {
  const params = getBaseParams()
  params.append('oauth_token', token)
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
 */
export const fetchUserCheckins = async (
  oauthToken: string,
  beforeTimestamp?: number,
  limit = 250
) => {
  const params = getBaseParams()
  params.append('oauth_token', oauthToken)
  beforeTimestamp && params.append('beforeTimestamp', beforeTimestamp.toString())
  limit && params.append('limit', limit.toString())

  const res = await fetch(
    `https://api.foursquare.com/v2/users/self/checkins?${params.toString()}`,
    {
      method: 'GET',
    }
  )

  return (await res.json()) as Checkin[]
}

/**
 * チェックインの詳細を取得する
 * @param checkinId チェックインID
 * @returns チェックインの詳細
 */
export const fetchCheckinDetails = async (
  token: string,
  checkinId: string
): Promise<CheckinDetail> => {
  const params = getBaseParams()
  params.append('oauth_token', token)

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
