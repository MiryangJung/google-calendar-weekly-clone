import { tDays } from '../../index'
import { dayOfWeek } from '../util/dayOfWeek'
import { hours24 } from '../util/HoursAday'
import { schedules } from '../store/modules/schedule'
import { useSelector } from 'react-redux'
import { Dispatch, SetStateAction } from 'react'

export default function ScheduleCalendar({
  days,
  setModalDate,
  setTimeIndex,
  setIsOpenModal,
}: {
  days: tDays[]
  setModalDate: Dispatch<SetStateAction<string>>
  setTimeIndex: Dispatch<SetStateAction<number>>
  setIsOpenModal: Dispatch<SetStateAction<boolean>>
}) {
  const scheduleData = useSelector(schedules)

  const modalHandle = (date: string, hour: number) => {
    setModalDate(date)
    setTimeIndex(hour)
    setIsOpenModal(true)
  }

  return (
    <>
      <div className="overflow-auto w-full flex flex-col mb-2">
        <div className="flex flex-col flex-1">
          <div className="sticky top-0 flex bg-white z-20">
            <div className="min-w-[70px] w-[70px] bg-white" />
            {days.map((day, index) => (
              <div className="flex-1 min-w-[81px] flex flex-col  bg-white z-20 pt-4" key={day.date}>
                <div className="text-center font-light text-sm">{dayOfWeek[index]}</div>
                <div className="text-center font-light text-2xl p-1">
                  <div
                    className={`w-10 h-10 rounded-full m-auto flex justify-center items-center
                      ${day.isToday && 'bg-blue-500 text-white'}`}
                  >
                    {day.date}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-1">
            <div className="bg-white sticky left-0 top-0 w-20 min-w-[70px] w-[70px] bg-white z-10">
              {hours24.map(hour => (
                <div className="font-light text-[12px] h-[60px] text-right pr-2" key={hour.text}>
                  {hour.text}시
                </div>
              ))}
            </div>
            <div className="flex flex-1 pt-2">
              {days.map(day => (
                <div
                  className="flex-1 min-w-[81px] flex flex-col relative"
                  key={`scheduleline${day.day}`}
                >
                  {hours24.map((hour, index) => (
                    <div
                      key={`schedule${hour.text}`}
                      className="border border-solid border-transparent border-r-zinc-200 border-t-zinc-200 h-[60px]"
                      onClick={() => modalHandle(day.day, index * 4)}
                    />
                  ))}
                  {scheduleData[day.day] && (
                    <>
                      {scheduleData[day.day].map((s, index) => {
                        const top = `${s.start.hour * 60 + s.start.minute}px`
                        let h = (s.end.hour - s.start.hour) * 60 - s.start.minute + s.end.minute
                        if (h < 20) h = 20
                        const height = `${h}px`
                        return (
                          <div
                            key={index}
                            className="absolute left-0 rounded w-5/6 p-[2px] text-[12px] font-light text-white overflow-y-auto"
                            style={{ top: top, height: height, background: s.color }}
                          >
                            {s.title}
                          </div>
                        )
                      })}
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
