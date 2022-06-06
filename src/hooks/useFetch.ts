import { useAuth } from '@/hooks/useAuth'
import useSWR, { SWRConfiguration, SWRResponse } from 'swr'

/**
 * 認証トークンを付与する
 * https://zenn.dev/yuitosato/articles/b3b3d22accdaa3
 */
export const useFetchFoursquare = <T extends unknown>(
  key: unknown[],
  fetcher: (token: string) => Promise<T>,
  config?: SWRConfiguration
): SWRResponse<T, Error> => {
  const { accessToken } = useAuth()

  return useSWR([accessToken, ...key], fetcher, config)
}
