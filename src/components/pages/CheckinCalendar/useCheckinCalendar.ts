import { convertAgendaObject } from '@/service/utilFns'
import { CalendarEvent } from '@/types/type'
import { useEffect, useState } from 'react'
import { useCheckin } from '@/hooks/useCheckin'

export const useCheckinCalendar = () => {
  const [loading, setLoading] = useState(true)
  const { fetchCheckin, checkins, fetchCheckinsHard } = useCheckin()
  const [calendarEvent, setCalenderEvent] = useState<CalendarEvent>({})

  const init = (date: Date = new Date()) => {
    fetchCheckin(date)
  }

  useEffect(() => {
    const calendarEvent = convertAgendaObject(checkins)
    setCalenderEvent(calendarEvent)
    setLoading(true)
  }, [checkins])

  useEffect(() => {
    init()
  }, [])

  return { loading, init, calendarEvent, fetchCheckinsHard }
}
