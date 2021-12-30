import React from 'react'
import { tDays } from '../../index'
import { useDispatch } from 'react-redux'
import { selectDay } from '../store/modules/calendar'
import { dayOfWeek } from '../util/dayOfWeek'

export default function SideCalendar({ days }: { days: tDays[] }) {
  const dispatch = useDispatch()
  return (
    <table className="table-fixed">
      <thead>
        <tr>
          {dayOfWeek.map((day, i) => (
            <th className="px-2 py-1 text-xs text-stone-500 text-center" key={i}>
              {day}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {days.map((day, index) => (
          <React.Fragment key={index}>
            {day.dayOfWeek === 0 && (
              <tr>
                {days.slice(index, index + 7).map(d => (
                  <td
                    key={d.date}
                    onClick={() => dispatch(selectDay(new Date(d.day).toString()))}
                    className={`px-2 py-2 text-xs text-center cursor-pointer
                    ${d.isThisMonth ? 'text-stone-900' : 'text-stone-400'}
                    ${d.isSelected && 'bg-blue-100 text-blue-600 rounded-full'}
                    ${d.isToday && 'bg-blue-500 text-white rounded-full'}`}
                  >
                    {d.date}
                  </td>
                ))}
              </tr>
            )}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  )
}
