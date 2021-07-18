import { useRecoil } from '@/hooks/useRecoil'
import { useResponseExtractor } from '@/hooks/useResponseExtractor'

export const useCache = () => {
  const { requestCache, setRequestCache } = useRecoil()
  const responseExtractor = useResponseExtractor()

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
