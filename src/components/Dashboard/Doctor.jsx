import React, { useState, useContext, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { UserContext } from "../../context/User";
// Components
import Appointments from "./Appointments/Appointments";
import AddSpeciality from "../Elements/AddSpeciality";
import Bookings from "./Bookings/Bookings";
import Overview from "./Overview/Overview";
import Doctors from "./Doctors/Doctors";
import Profile from "./Profile/Profile";
import Reviews from "./Reviews/Reviews";

const Doctor = () => {
  const [showAddSpeciality, setShowAddSpeciality] = useState(false);

  // Get user info state from user context
  const { userInfo } = useContext(UserContext);

  // Display 'Add speciality' container if current doctor speciality is not added
  useEffect(() => {
    if (userInfo.speciality === "" || !userInfo.speciality) {
      setShowAddSpeciality(true);
    }

    return () => setShowAddSpeciality(false);
  }, [userInfo.speciality]);

  return (
    <div className="pages-wrapper">
      {/* DOCTOR PAGES */}
      <Routes>
        <Route path="/" element={<Overview />} />
        <Route path="/overview" element={<Overview />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/reviews" element={<Reviews />} />
      </Routes>

      {/* ADD SPECIALITY CONTAINER */}
      {showAddSpeciality && <AddSpeciality setShow={setShowAddSpeciality} />}
    </div>
  );
};

export default Doctor;
