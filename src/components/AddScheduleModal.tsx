import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import createSelectTimes from '../util/createSelectTimes'
import { useDispatch } from 'react-redux'
import { tRangeColor, tScheduleDetail } from '../../index'
import { addSchedule } from '../store/modules/schedule'

export default function AddScheduleModal({
  defaultDate,
  timeIndex,
  isOpen,
  setIsOpen,
}: {
  defaultDate: string
  timeIndex: number
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}) {
  const dispatch = useDispatch()
  const [isSelectStartTime, setIsSelectStartTime] = useState<boolean>(false)
  const [isSelectEndTime, setIsSelectEndTime] = useState<boolean>(false)

  const [title, setTitle] = useState<string>('')
  const [date, setDate] = useState<string>('2021-12-31')
  const [color, setColor] = useState<tRangeColor>('red')
  const [startHour, setStartHour] = useState<number>(12)
  const [startMinute, setStartMinute] = useState<number>(12)
  const [endHour, setEndHour] = useState<number>(0)
  const [endMinute, setEndMinute] = useState<number>(0)

  const [endSelectTimeIndex, setEndSelectTimeIndex] = useState<number>(-1)

  const [displayStartTime, setDisplayStartTime] = useState<string>('')
  const [displayEndTime, setDisplayEndTime] = useState<string>('')

  const selectTimes: Array<{ hour: number; minute: string; text: string }> = createSelectTimes()
  const colors: tRangeColor[] = ['red', 'orange', 'green', 'blue', 'brown', 'pink']

  const startTimeChange = (hour: number, minute: string, text: string, index: number) => {
    if (endSelectTimeIndex < index) {
      setEndSelectTimeIndex(index)
      endTimeChange(hour, minute, text)
    }
    setIsSelectStartTime(false)
    setDisplayStartTime(text)
    setStartHour(hour)
    setStartMinute(parseInt(minute))
  }

  const endTimeChange = (hour: number, minute: string, text: string) => {
    setIsSelectEndTime(false)
    setDisplayEndTime(text)
    setEndHour(hour)
    setEndMinute(parseInt(minute))
  }

  const submitHandle = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsOpen(false)
    setTitle('')
    const schedule: { date: string; data: tScheduleDetail } = {
      date: date,
      data: {
        start: { hour: startHour, minute: startMinute },
        end: { hour: endHour, minute: endMinute },
        color: color,
        title: title,
      },
    }
    dispatch(addSchedule(schedule))
  }

  useEffect(() => {
    setDate(defaultDate)
    const defaultTime = selectTimes[timeIndex]
    startTimeChange(defaultTime.hour, defaultTime.minute, defaultTime.text, timeIndex)
  }, [defaultDate, timeIndex])

  return (
    <div
      className={`
        ${isOpen ? 'fixed' : 'hidden'} 
        shadow-2xl rounded-lg z-50 top-[150px] left-8 m-auto w-[350px] bg-white flex flex-col`}
    >
      <div className="w-full mb-3 py-1 px-3 bg-gray-100 rounded-t-lg">
        <svg
          className="ml-auto cursor-pointer"
          xmlns="http://www.w3.org/2000/svg"
          height="20px"
          viewBox="0 0 24 24"
          width="20px"
          fill="#222222"
          onClick={() => setIsOpen(false)}
        >
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
        </svg>
      </div>
      <form className="py-3 px-5 w-full flex flex-col" onSubmit={submitHandle}>
        <input
          type="text"
          className="w-full border-2 border-solid border-transparent border-b-zinc-200 text-2xl outline-none focus:border-b-blue-500"
          placeholder="제목 추가"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
        <div className="flex mt-3 relative items-center">
          <input
            type="date"
            value={date}
            className="w-[110px] outline-none"
            onChange={e => {
              setDate(e.target.value)
            }}
          />
          {isSelectStartTime && (
            <div className="absolute top-[30px] left-[120px] w-[180px] h-[180px] rounded-md bg-white shadow flex flex-col overflow-y-auto">
              {selectTimes.map((time, index) => (
                <div
                  className="p-2 text-sm cursor-pointer hover:bg-gray-100"
                  key={time.text}
                  onClick={() => startTimeChange(time.hour, time.minute, time.text, index)}
                >
                  {time.text}
                </div>
              ))}
            </div>
          )}
          <span
            className="ml-3 mr-2 w-[90px] cursor-pointer p-1"
            onClick={() => {
              setIsSelectStartTime(true)
              setIsSelectEndTime(false)
            }}
          >
            {displayStartTime}
          </span>
          -
          {isSelectEndTime && (
            <div className="absolute top-[30px] left-[160px] w-[180px] h-[180px] rounded-md bg-white shadow flex flex-col overflow-y-auto">
              {selectTimes.slice(endSelectTimeIndex).map(time => (
                <div
                  className="p-2 text-sm cursor-pointer hover:bg-gray-100"
                  key={time.text}
                  onClick={() => endTimeChange(time.hour, time.minute, time.text)}
                >
                  {time.text}
                </div>
              ))}
            </div>
          )}
          <span
            className="ml-2 w-[90px] cursor-pointer p-1"
            onClick={() => {
              setIsSelectEndTime(true)
              setIsSelectStartTime(false)
            }}
          >
            {displayEndTime}
          </span>
        </div>
        <div className="flex mt-5">
          {colors.map(clr => (
            <div
              key={clr}
              className={`w-6 h-6 rounded-full cursor-pointer mr-2 hover:scale-110
                ${clr === color && 'scale-125'}`}
              style={{ background: clr }}
              onClick={() => setColor(clr)}
            />
          ))}
        </div>
        <div className="w-full mb-3 mt-8 flex">
          <button
            className="ml-auto bg-blue-500 text-white px-5 py-1 text-sm rounded hover:bg-blue-700"
            type="submit"
          >
            저장
          </button>
        </div>
      </form>
    </div>
  )
}
