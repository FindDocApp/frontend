import React from "react";
// Components
import MenuItem from "./MenuItem";

const DoctorMenu = () => {
  return (
    <>
      <MenuItem
        page="Overview"
        path='/dashboard/doctor/overview'
      />
      <MenuItem
        page="Bookings"
        path='/dashboard/doctor/bookings'
      />
      <MenuItem
        page="Appointments"
        path='/dashboard/doctor/appointments'
      />
      <MenuItem
        page="Reviews"
        path='/dashboard/doctor/reviews'
      />
      <MenuItem
        page="Profile"
        path='/dashboard/doctor/profile'
      />
    </>
  );
};

export default DoctorMenu;
