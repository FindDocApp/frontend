import React from "react";
// Components
import MenuItem from "./MenuItem";

const PatientMenu = () => {
  return (
    <>
      <MenuItem
        page="Overview"
        path='/dashboard/patient/overview'
      />
      <MenuItem
        page="Doctors"
        path='/dashboard/patient/doctors'
      />
      <MenuItem
        page="Bookings"
        path='/dashboard/patient/bookings'
      />
      <MenuItem
        page="Appointments"
        path='/dashboard/patient/appointments'
      />
      <MenuItem
        page="Profile"
        path='/dashboard/patient/profile'
      />
    </>
  );
};

export default PatientMenu;