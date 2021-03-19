import { config } from '../service/config'

const getCredencial = () => {
  const params = { oauth_token: config().OAUTH_TOKEN, v: '20210301' }
  const query = new URLSearchParams(params)
  return query
}

const responseExtractor = async (res: any) => {
  return (await res.json()).response
}

export const useFoursquare = () => {
  const params = getCredencial()

  const fetchUserCheckins = (startEnd: IStartEnd) => {
    params.append('afterTimestamp', startEnd.afterTimestamp)
    params.append('beforeTimestamp', startEnd.beforeTimestamp)
    return fetch(`https://api.foursquare.com/v2/users/self/checkins?${params}`, {
      method: 'get',
    })
      .catch((err) => {
        console.error(err)
      })
      .then(async (res) => await responseExtractor(res))
  }

  return { fetchUserCheckins }
}

interface IStartEnd {
  afterTimestamp: string
  beforeTimestamp: string
}
