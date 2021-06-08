import { Checkin } from '../interface/Foursquare.type'
import { useRecoil } from './useRecoil'

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

export const useCache = () => {
  const { requestCache, setRequestCache } = useRecoil()

  const checkCache = <T>(
    url: string,
    method: 'GET' | 'POST',
    type: 'checkins' | 'checkin' | 'user'
  ): Promise<T> => {
    const cacheIndex = requestCache.findIndex((key) => key.url === url)
    if (cacheIndex != -1) {
      return requestCache[cacheIndex].request as Promise<T>
    } else {
      const request = fetch(url, { method })
        .catch((err) => console.error(err))
        .then(async (res) => await responseExtractor<T>({ res, type }))
      setRequestCache([...requestCache, { url, request }])
      return request
    }
  }
  return {
    checkCache,
  }
}
