import { axiosClient } from '@/components/Provider/AxiosProvider'

const API_KEY = '1691cbd0582e48ae9227e4821f199d67'

export const fetchArticles = () => {
  return axiosClient
    .get(
      `https://newsapi.org/v2/everything?q=tesla&from=2022-05-30&sortBy=publishedAt&apiKey=${API_KEY}`
    )
    .then((t) => t.data)
}
