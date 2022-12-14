import React from "react";

const PATIENT = 'patient'
const DOCTOR = 'doctor'

// User role radio buttons
const SelectRole = ({role, setRole}) => {
  return (
    <>
        <label className="semiBold font15">Select role</label>
        <div className="select-role-input">
        <input 
            type="radio" 
            name="role" 
            checked={role === PATIENT}
            onChange={() => setRole(PATIENT)}
        />
        <label>Patient</label>
        <input 
            type="radio" 
            name="role" 
            checked={role === DOCTOR}
            onChange={() => setRole(DOCTOR)}
        />
        <label>Doctor</label>
        </div>
    </>
  )
}

export default SelectRole