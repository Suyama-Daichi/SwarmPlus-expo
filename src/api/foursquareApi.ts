import type { FoursquareResponse, Checkin, FoursquareUser } from '@/types/Foursquare'
import { foursquareConfig } from '@/libs/foursquare'
import { axiosClient } from '@/components/Provider/AxiosProvider'
import { pickFoursquareBody } from '@/utils/responsePicker'
import { Summary } from '@/types/Foursquare'

const BASE_URL = 'https://api.foursquare.com/v2/'

const getBaseParams = () => {
  const query = new URLSearchParams(foursquareConfig.params)
  return query
}

/** ユーザー情報を取得 */
export const fetchUser = async (token: string, userId?: string) => {
  const params = getBaseParams()
  params.append('oauth_token', token)
  const res = await axiosClient
    .get<FoursquareResponse>(`${BASE_URL}users/${userId || 'self'}?${params.toString()}`)
    .then((t) => t.data)
  const user = pickFoursquareBody<FoursquareUser>(res)

  return user
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
  const res = await axiosClient
    .get<FoursquareResponse>(`${BASE_URL}users/self/checkins?${params.toString()}`)
    .then((t) => t.data)
  const checkins = pickFoursquareBody<Summary<Checkin>>(res)
  return checkins
}

/**
 * チェックインの詳細を取得する
 * @param checkinId チェックインID
 * @returns チェックインの詳細
 */
export const fetchCheckinDetails = async (token: string, checkinId: string): Promise<unknown> => {
  const params = getBaseParams()
  params.append('oauth_token', token)
  const res = await axiosClient
    .get<FoursquareResponse>(`${BASE_URL}checkins/${checkinId}?${params.toString()}`)
    .then((t) => t.data)
  const checkin = pickFoursquareBody<Checkin>(res)

  return checkin
}

/**
 * ユーザーのFoursquareアクセストークン(OauthToken)を取得
 * @param code コード
 * @returns アクセストークン
 */
export const fetchAccessToken = async (code: string) => {
  const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } = foursquareConfig

  const res = await axiosClient
    .get(
      `https://foursquare.com/oauth2/access_token?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&grant_type=authorization_code&redirect_uri=${REDIRECT_URI}&code=${code}`
    )
    .then((t) => t.data.access_token as string)

  return res
}
