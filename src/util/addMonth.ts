export default function addMonth(date: string, month: number): string {
  const newDate = new Date(date)
  newDate.setDate(1)
  newDate.setMonth(newDate.getMonth() + month)
  return newDate.toString()
}
