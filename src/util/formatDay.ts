export default function formatDay(day: Date): string {
  const month = day.getMonth() + 1
  const date = day.getDate()
  return `${day.getFullYear()}-${month < 10 ? `0${month}` : month}-${date < 10 ? `0${date}` : date}`
}
