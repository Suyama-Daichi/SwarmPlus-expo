import { fetchUserCheckins } from '@/service/foursquareApi'
import { Checkin } from '@/types/Foursquare'
import { useEffect, useState } from 'react'

const MAX_LIMIT = 250

export const useAllCheckins = () => {
  const [loading, setLoading] = useState(true)
  const [tempAllCheckins, setTempAllCheckins] = useState<Checkin[]>()
  const [allCheckins, setAllCheckins] = useState<Checkin[]>()
  const [pageNum, setPageNum] = useState<number>()
  const [totalCheckinCount, setTotalCheckinCount] = useState<number>()

  useEffect(() => {
    if (!totalCheckinCount) return
    // TODO: 開発中は取得しすぎるため250以下に制限
    const pageNum = 249 / MAX_LIMIT
    // const pageNum = totalCheckinCount / MAX_LIMIT
    setPageNum(pageNum)
  }, [totalCheckinCount])

  useEffect(() => {
    if (!pageNum) return
    fetchAllCheckins(pageNum)
  }, [pageNum])

  const fetchAllCheckins = async (pageNum: number) => {
    const isLastLoad = pageNum < 1
    const offset = MAX_LIMIT * (pageNum - 1)
    if (pageNum < 0) return
    const result = await fetchUserCheckins({
      offset: isLastLoad ? 0 : offset,
      limit: isLastLoad ? MAX_LIMIT + offset : MAX_LIMIT,
    })
    setTempAllCheckins((current) => (current ? [...current, ...result] : result))
    setPageNum((current) => (current ? current - 1 : 0))
    setLoading(!isLastLoad)
  }

  useEffect(() => {
    if (loading) return
    setAllCheckins(tempAllCheckins)
  }, [tempAllCheckins, loading])

  return {
    fetchAllCheckins: setTotalCheckinCount,
    loading,
    allCheckins,
  }
}
