import { tDays } from '../../index'

export default function getThisWeek(days: tDays[]): tDays[] {
  const isThisWeekAndSunday = (element: tDays) => element.isThisWeek && element.dayOfWeek === 0
  const thisWeekAndSundayIndex = days.findIndex(isThisWeekAndSunday)
  return days.slice(thisWeekAndSundayIndex, thisWeekAndSundayIndex + 7)
}
