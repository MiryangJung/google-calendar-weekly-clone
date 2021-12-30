import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Calendar from './pages/Calendar'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Calendar />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
