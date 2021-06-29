import { AccessToken, IStartEnd } from '@/types/type'
import type { Checkins, User, FoursquareResponse, CheckinDetail } from '@/types/Foursquare'
import { config } from '@/service/config'
import { useCache } from '@/hooks/useCache'
import { useCallback } from 'react'
import { FOURSQUARE_ACCESS_TOKEN } from '@/constants/StorageKeys'
import storage from '../service/reactNativeStorage'

const getBaseParams = async () => {
  const oauthToken = await storage.load<string>({ key: FOURSQUARE_ACCESS_TOKEN })
  const params = {
    oauth_token: oauthToken,
    v: '20210301',
    limit: '250',
    locale: 'ja',
  }
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

  const fetchUser = useCallback(async (): Promise<User> => {
    const params = await getBaseParams()
    return fetch(`https://api.foursquare.com/v2/users/self?${params.toString()}`, {
      method: 'GET',
    })
      .catch((err) => {
        console.error(err)
      })
      .then(async (res) => await responseExtractor<User>({ res, type: 'user' }))
  }, [])

  /**
   * ユーザーのチェックインを取得
   * @param startEnd 日|月の始まりと末のタイムスタンプ
   * @returns チェックインのリスト
   */
  const fetchUserCheckins = useCallback(async (startEnd?: IStartEnd): Promise<Checkins> => {
    const params = await getBaseParams()
    if (startEnd) {
      params.append('afterTimestamp', startEnd.afterTimestamp)
      params.append('beforeTimestamp', startEnd.beforeTimestamp)
      params.append('sort', 'oldestfirst')
    }
    return checkCache<Checkins>(
      `https://api.foursquare.com/v2/users/self/checkins?${params.toString()}`,
      'GET',
      'checkins'
    )
  }, [])

  /**
   * チェックインの詳細を取得する
   * @param checkinId チェックインID
   * @returns チェックインの詳細
   */
  const fetchCheckinDetails = useCallback(async (checkinId: string): Promise<CheckinDetail> => {
    const params = await getBaseParams()
    return checkCache<CheckinDetail>(
      `https://api.foursquare.com/v2/checkins/${checkinId}?${params.toString()}`,
      'GET',
      'checkin'
    )
  }, [])

  /**
   * ユーザーのFoursquareアクセストークン(OauthToken)を取得
   * @param code コード
   * @returns アクセストークン
   */
  const fetchAccessToken = async (code: string) => {
    const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } = config()

    const request = await fetch(
      `https://foursquare.com/oauth2/access_token?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&grant_type=authorization_code&redirect_uri=${REDIRECT_URI}&code=${code}`,
      { method: 'GET' }
    )

    return (await (request.json() as Promise<AccessToken>)).access_token
  }

  return { fetchUser, fetchUserCheckins, fetchCheckinDetails, fetchAccessToken }
}
