import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { tSchedule, tScheduleDetail } from '../../../index'
import { RootState } from '../index'

const initialState: tSchedule = {
  '2022-01-01': [
    {
      start: { hour: 1, minute: 20 },
      end: { hour: 1, minute: 40 },
      color: 'pink',
      title: '코딩하기',
    },
  ],
}

export const scheduleSlice = createSlice({
  name: 'schedule',
  initialState,
  reducers: {
    addSchedule: (state, action: PayloadAction<{ date: string; data: tScheduleDetail }>) => {
      if (!state[action.payload.date]) {
        state[action.payload.date] = []
      }
      state[action.payload.date] = [...state[action.payload.date], action.payload.data]
    },
    removeSchedule: (state, action: PayloadAction<{ date: string; index: number }>) => {
      delete state[action.payload.date][action.payload.index]
    },
  },
})

export const { addSchedule, removeSchedule } = scheduleSlice.actions
export const schedules = (state: RootState) => state.schedule

export default scheduleSlice.reducer
