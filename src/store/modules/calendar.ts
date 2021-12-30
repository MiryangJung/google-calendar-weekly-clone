import { tDays } from '../../../index'
import getCalendar from '../../util/getCalendar'
import addWeek from '../../util/addWeek'
import addMonth from '../../util/addMonth'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../index'

type tCurrent = { day: string; days: tDays[]; year: number; month: number }
type tCalendar = {
  select: string
  current: tCurrent
}

const today = new Date()
const initCalendar = getCalendar({ select: today, current: today })

const initialState: tCalendar = {
  select: today.toString(),
  current: {
    day: new Date(today).toString(),
    days: initCalendar.days,
    year: initCalendar.year,
    month: initCalendar.month,
  },
}

const createNewDate = ({ selectDate, changeDate }: { selectDate: string; changeDate: string }) => {
  return getCalendar({
    select: new Date(selectDate),
    current: new Date(changeDate),
  })
}

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    nextWeek: state => {
      const addWeekDate = addWeek(state.current.day, 1)
      const newDate = createNewDate({ selectDate: state.select, changeDate: addWeekDate })
      state.current = {
        day: addWeekDate,
        ...newDate,
      }
    },
    nextMonth: state => {
      const addMonthDate = addMonth(state.current.day, 1)
      const newDate = createNewDate({ selectDate: state.select, changeDate: addMonthDate })
      state.current = {
        day: addMonthDate,
        ...newDate,
      }
    },
    lastWeek: state => {
      const backWeekDate = addWeek(state.current.day, -1)
      const newDate = createNewDate({ selectDate: state.select, changeDate: backWeekDate })
      state.current = {
        day: backWeekDate,
        ...newDate,
      }
    },
    lastMonth: state => {
      const backMonthDate = addMonth(state.current.day, -1)
      const newDate = createNewDate({ selectDate: state.select, changeDate: backMonthDate })
      state.current = {
        day: backMonthDate,
        ...newDate,
      }
    },
    selectDay: (state, action: PayloadAction<string>) => {
      state.select = action.payload
      const selectDate = new Date(action.payload).toString()
      const newDate = createNewDate({ selectDate: selectDate, changeDate: selectDate })
      state.current = {
        day: selectDate,
        ...newDate,
      }
    },
  },
})

export const { nextWeek, nextMonth, lastWeek, lastMonth, selectDay } = calendarSlice.actions
export const currentCalendar = (state: RootState) => state.calendar.current

export default calendarSlice.reducer
