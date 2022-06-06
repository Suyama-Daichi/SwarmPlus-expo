import { useEffect } from 'react'
import axios, { AxiosRequestConfig } from 'axios'
import { useAuth } from '@/hooks/useAuth'

const BaseUrl = 'https://xxxxx.xxx.com'

// デフォルト config の設定
export const axiosClient = axios.create({
  baseURL: BaseUrl,
  timeout: 3000,
  headers: {
    'Content-Type': 'application/json',
  }
})


export function AxiosClientProvider({ children }: {children: React.ReactElement}) {
  // 関数コンポーネントなのでフックが使える
  const { sessionUser } = useAuth()
  useEffect(() => {
    // リクエスト インターセプター
    const requestInterceptors =
      axiosClient.interceptors.request.use(async (config: AxiosRequestConfig) => {
        if (config.headers !== undefined) {
          const accessToken = await sessionUser?.getIdToken()
          if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`
          }
        }
        return config
      })

    // レスポンス インターセプター
    const responseInterceptor = axiosClient.interceptors.response.use(
      (response) => {
        return response
      },
      (error) => {
        switch (error.response?.status) {
          case 401:
          // なにかする
            break
          default:
            break
        }
        return Promise.reject(error)
      }
    )

    // クリーンアップ
    return () => {
      axiosClient.interceptors.request.eject(requestInterceptors)
      axiosClient.interceptors.response.eject(responseInterceptor)
    }

  }, [])

  return (<>{children}</>)
}