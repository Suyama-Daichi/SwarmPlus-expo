import { useEffect, useState } from 'react'
import { useUser } from '@/hooks/useUser'
import { setUserId } from '@/hooks/useAnalytics'
import { fetchAuthUser } from '@/api/auth'

export const useInitialize = () => {
  const { fetchSetUser, setAuthUser } = useUser()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const init = async () => {
      const user = await fetchSetUser()
      setUserId(user ? user.id : 'undefined')
      fetchAuthUser().then((user) => {
        setAuthUser(user)
      })
      setLoading(false)
    }
    init()
  }, [])

  return { loading }
}
