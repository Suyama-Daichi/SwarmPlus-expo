import { FoursquareResponse } from '@/types/Foursquare'

type Props = {
  res: void | Response
  type: 'checkins' | 'checkin' | 'user'
}

export const useResponseExtractor = () => {
  const responseExtractor = async <T>({ res, type }: Props): Promise<T> => {
    const parsedRes = (await (res as Response).json()) as FoursquareResponse
    if (parsedRes.meta.code !== 200) {
      console.error({ error: 'failed', message: parsedRes.meta.errorDetail })
    }
    return parsedRes.response[type] as unknown as T
  }

  return responseExtractor
}
