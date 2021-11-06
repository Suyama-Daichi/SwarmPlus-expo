import { convertAgendaObject } from '@/service/utilFns'
import { CalendarEvent } from '@/types/type'
import { useEffect, useState } from 'react'
import { useCheckin } from '../../../hooks/useCheckin'

export const useCheckinCalendar = () => {
  const [loading, setLoading] = useState(true)
  const { fetchCheckin } = useCheckin()
  const [calendarEvent, setCalenderEvent] = useState<CalendarEvent>({})

  const init = async (date: Date = new Date()) => {
    const checkins = await fetchCheckin(date)
    const calendarEvent = convertAgendaObject(checkins)
    setCalenderEvent(calendarEvent)
    setLoading(true)
  }

  useEffect(() => {
    init()
  }, [])

  return { loading, init, calendarEvent }
}
