import { configureStore } from '@reduxjs/toolkit'
import calendarReducer from './modules/calendar'
import scheduleReducer from './modules/schedule'

export const store = configureStore({
  reducer: {
    calendar: calendarReducer,
    schedule: scheduleReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
})

export type RootState = ReturnType<typeof store.getState>
