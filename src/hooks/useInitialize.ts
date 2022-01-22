import { useEffect, useState } from 'react'
import { useUser } from '@/hooks/useUser'
import { setUserId } from '@/hooks/useAnalytics'

export const useInitialize = () => {
  const { fetchSetUser } = useUser()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const init = async () => {
      const user = await fetchSetUser()
      setUserId(user ? user.id : 'undefined')
      setLoading(false)
    }
    init()
  }, [])

  return { loading }
}
