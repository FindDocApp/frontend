import React from 'react'
import { Routes, Route } from "react-router-dom";
// Components
import Appointments from './Appointments/Appointments'
import Overview from './Overview/Overview'
import Bookings from './Bookings/Bookings'
import Profile from './Profile/Profile'
import Doctors from './Doctors/Doctors'

const Patient = () => {
  return (
    <div className='pages-wrapper'>
      {/* PATIENT PAGES */}
      <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/overview" element={<Overview />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  )
}

export default Patient