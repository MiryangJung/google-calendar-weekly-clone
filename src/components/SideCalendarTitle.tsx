import { useDispatch } from 'react-redux'
import { lastMonth, nextMonth } from '../store/modules/calendar'

export default function SideCalendarTitle({ year, month }: { year: number; month: number }) {
  const dispatch = useDispatch()
  return (
    <div className="px-2 pb-2 flex justify-between items-center">
      <span>
        {year}년 {month}월
      </span>
      <div className="flex items-center">
        <img
          src="/left.svg"
          alt="logo"
          width={24}
          height={24}
          className="cursor-pointer"
          onClick={() => dispatch(lastMonth())}
        />
        <img
          src="/right.svg"
          alt="logo"
          width={24}
          height={24}
          className="cursor-pointer"
          onClick={() => dispatch(nextMonth())}
        />
      </div>
    </div>
  )
}
