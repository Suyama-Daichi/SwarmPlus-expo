import { FoursquareResponse } from '@/types/Foursquare'

export const pickFoursquareBody = <T>(response: FoursquareResponse) => {
  if ('user' in response.response) {
    return response.response.user as unknown as T
  }
  if ('checkin' in response.response) {
    return response.response.checkin as unknown as T
  }
  if ('checkins' in response.response) {
    return response.response.checkins as unknown as T
  }
}
