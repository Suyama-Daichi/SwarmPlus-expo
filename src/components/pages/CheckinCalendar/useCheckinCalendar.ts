import { convertAgendaObject } from '@/service/utilFns'
import { CalendarEvent } from '@/types/type'
import { useEffect, useState } from 'react'
import { useCheckin } from '@/hooks/useCheckin'
import { atom, useRecoilState } from 'recoil'
import { useLoading } from '@/hooks/useLoading'
import { Checkin } from '../../../types/Foursquare'

const fetchedMonthAtom = atom<Date[]>({
  key: 'fetchedMonth',
  default: [],
})

export const useCheckinCalendar = () => {
  const [fetchedMonth, setFetchedMonth] = useRecoilState(fetchedMonthAtom)
  const { checkins } = useCheckin()
  const [calendarEvent, setCalenderEvent] = useState<CalendarEvent>({})
  const { loading, enableLoading, disableLoading } = useLoading()

  const fetchCheckins = async (
    date: Date,
    fetcher: (date: Date) => Promise<Checkin[] | undefined>
  ) => {
    enableLoading()
    if (
      fetcher.name === 'fetchCheckinsSoft' &&
      fetchedMonth.some((s) => s.getTime() === date.getTime())
    ) {
      return
    }
    await fetcher(date)
    setFetchedMonth((current) => (current ? [...current, date] : [date]))
    disableLoading()
  }

  useEffect(() => {
    const calendarEvent = convertAgendaObject(checkins)
    setCalenderEvent(calendarEvent)
  }, [checkins])

  return { loading, fetchCheckins, calendarEvent }
}
