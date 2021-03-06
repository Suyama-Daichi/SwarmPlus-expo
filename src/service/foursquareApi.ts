import { AccessToken, IStartEnd } from '@/types/type'
import type { Checkins, User, CheckinDetail } from '@/types/Foursquare'
import { config } from '@/service/config'
import { FOURSQUARE_ACCESS_TOKEN } from '@/constants/StorageKeys'
import storage from '@/service/reactNativeStorage'
import { responseExtractor } from './utilFns'

const getBaseParams = async () => {
  const oauthToken = await storage.load<string>({ key: FOURSQUARE_ACCESS_TOKEN })
  const params = {
    oauth_token: oauthToken,
    v: '20210301',
    limit: '250',
    locale: 'ja',
    mode: 'swarm',
  }
  const query = new URLSearchParams(params)
  return query
}

/** ユーザー情報を取得 */
export const fetchUser = async (userId?: string): Promise<User> => {
  const params = await getBaseParams()
  return fetch(`https://api.foursquare.com/v2/users/${userId || 'self'}?${params.toString()}`, {
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
export const fetchUserCheckins = async (startEnd?: IStartEnd): Promise<Checkins> => {
  const params = await getBaseParams()
  if (startEnd) {
    params.append('afterTimestamp', startEnd.afterTimestamp)
    params.append('beforeTimestamp', startEnd.beforeTimestamp)
    params.append('sort', 'oldestfirst')
  }

  return await fetch(`https://api.foursquare.com/v2/users/self/checkins?${params.toString()}`, {
    method: 'GET',
  })
    .catch((err) => console.error(err))
    .then(async (res) => await responseExtractor<Checkins>({ res, type: 'checkins' }))
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
