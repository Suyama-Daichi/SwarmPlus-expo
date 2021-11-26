import { useState } from 'react'

export const useLoading = () => {
  const [loading, setLoading] = useState(false)

  const enableLoading = () => setLoading(true)
  const disableLoading = () => setLoading(false)

  return { enableLoading, disableLoading, loading }
}
