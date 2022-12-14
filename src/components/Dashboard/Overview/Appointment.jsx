import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// Assets
import Img from "../../../assets/img/dashboard/profile-img.jpg";
// Icons
import { faComments } from "@fortawesome/free-regular-svg-icons";
import { isAppointmentDate } from "../../../utils/date";

const Appointment = ({ appointment, joinAppointment }) => {
  const [appointmentStatus, setAppointmentStatus] = useState("");

  // Check appointment status on component mount
  useEffect(() => {
    // Set appointment status
    let didAppointmentStart = isAppointmentDate(appointment);
    setAppointmentStatus(didAppointmentStart.message);
  }, [appointment]);

  return (
    <Wrapper>
      {/* USER PROFILE IMAGE */}
      <img
        src={
          appointment.user.profileImage ? appointment.user.profileImage : Img
        }
        alt=""
      />

      {/* USER INFO CONTAINER */}
      <div className="info">
        <h3>{appointment.user.username}</h3>
        <p>{appointment.date}</p>
      </div>

      {/* JOIN APPOINTMENT */}
      {appointmentStatus === "joined" && (
        <div className="join-btn" onClick={() => joinAppointment()}>
          <FontAwesomeIcon icon={faComments} />
        </div>
      )}
    </Wrapper>
  );
};

export default Appointment;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 1rem;

  img {
    max-width: 50px;
    min-width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 1rem;
    object-fit: cover;
  }
  .info {
    width: 100%;
    display: flex;
    flex-direction: column;
    h3 {
      font-size: 18px;
    }
    p {
      padding: 0.5rem 0;
      line-height: 0;
      color: #808080;
    }
  }
  .join-btn {
    display: grid;
    place-items: center;
    cursor: pointer;
    justify-self: flex-end;
    width: 40px;
    min-width: 40px;
    height: 40px;
    background-color: #2d59eb;
    border-radius: 10px;
    transition: all 0.25s ease;

    svg {
      font-size: 16px;
      color: #fff;
    }

    &:hover {
      background-color: #2248c5;
    }
  }

  @media (max-width: 860px) {
    margin-top: 0.75rem;

    img {
      max-width: 40px;
      min-width: 40px;
      height: 40px;
      margin-right: 0.75rem;
    }
    .info {
      h3 {
        font-size: 14px;
      }
      p {
        font-size: 12px;
        padding: 0.35rem 0;
      }
    }
    .join-btn {
      width: 30px;
      min-width: 30px;
      height: 30px;
      border-radius: 7.5px;

      svg {
        font-size: 12px;
      }
    }
  }
`;
