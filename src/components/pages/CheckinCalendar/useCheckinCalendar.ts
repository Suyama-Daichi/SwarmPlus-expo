import { convertAgendaObject } from '@/service/utilFns'
import { CalendarEvent } from '@/types/type'
import { useEffect, useState } from 'react'
import { useCheckin } from '../../../hooks/useCheckin'

export const useCheckinCalendar = () => {
  const [loading, setLoading] = useState(true)
  const { fetchCheckin } = useCheckin()
  const [calendarEvent, setCalenderEvent] = useState<CalendarEvent>({})

  useEffect(() => {
    const init = async () => {
      const checkins = await fetchCheckin(new Date())
      const calendarEvent = convertAgendaObject(checkins)
      setCalenderEvent(calendarEvent)
      setLoading(true)
    }
    init()
  }, [])

  return { loading, fetchCheckin, calendarEvent }
}
