import { useEffect, useState } from 'react'
import { useUser } from '@/hooks/useUser'

export const useInitialize = () => {
  const { fetchSetUser } = useUser()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const init = async () => {
      await fetchSetUser()
      setLoading(false)
    }
    init()
  }, [])

  return { loading }
}
