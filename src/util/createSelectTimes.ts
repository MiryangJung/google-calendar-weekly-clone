import { hours24 } from './HoursAday'

export default function createSelectTimes(): Array<{ hour: number; minute: string; text: string }> {
  const minutes = ['00', '15', '30', '45']

  const times: Array<{ hour: number; minute: string; text: string }> = []
  hours24.forEach(h => {
    minutes.forEach(m => {
      times.push({
        hour: h.hour,
        minute: m,
        text: `${h.text}:${m}`,
      })
    })
  })
  return times
}
