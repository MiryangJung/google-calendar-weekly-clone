export type tDays = {
  date: number
  dayOfWeek: number
  isToday: boolean
  isSelected: boolean
  isThisWeek: boolean
  isThisMonth: boolean
  day: string
}

export type tHours = {
  text: string
  hour: number
}

export type tTime = { hour: number; minute: number }

export type tRangeColor = 'red' | 'orange' | 'green' | 'blue' | 'brown' | 'pink'
export type tScheduleDetail = { start: tTime; end: tTime; color: tRangeColor; title: string }

export type tSchedule = { [key: string]: Array<tScheduleDetail> }
