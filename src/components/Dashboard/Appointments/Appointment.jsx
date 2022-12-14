import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getFormatedDate, isAppointmentDate } from "../../../utils/date";
// Asssets
import Img from "../../../assets/img/dashboard/profile-img.jpg";
// Components
import ConfirmTab from "../../Elements/ConfirmTab";
import Button from "../../Buttons/Button";
import Reschedule from "./Reschedule";
import Date from "./Date";

const Appointment = ({
  rescheduleAppointment,
  autoCancelAppointment,
  setRescheduledDate,
  cancelAppointment,
  rescheduledDate,
  joinAppointment,
  appointment,
  role,
}) => {
  const [showRescheduleAppointment, setShowRescheduleAppointment] =
    useState(false);
  const [showConfirmCancel, setShowConfirmCancel] = useState(false);
  const [confirmCancelMessage, setConfirmCancelMessage] = useState("");
  const [appointmentStatus, setAppointmentStatus] = useState("");
  const [expiryTime, setExpiryTime] = useState();

  // Handles confirmation of appointment cancellation
  const handleCancelAppointment = () => {
    // Set prompt message to confirm cancelling an appointment
    setConfirmCancelMessage(`
      Are you sure you want to ${
        role === "patient" ? "cancel" : "decline"
      } this appointment with ${appointment.user.username}, at ${
      appointment.date
    }?
    `);

    // Show confirmation tab
    setShowConfirmCancel(true);
  };

  // Check appointment status on component mount
  useEffect(() => {
    // Set appointment status
    let didAppointmentStart = isAppointmentDate(appointment);
    setAppointmentStatus(didAppointmentStart.message);

    // Set appointment end date, if appointment started
    if (didAppointmentStart.status) {
      setExpiryTime(getFormatedDate(didAppointmentStart.expiryTime));
    }
  }, [appointment]);

  return (
    <>
      {/* APPOINTMENT CONTAINER */}
      <Wrapper className="appointment">
        {/* USER PROFILE IMAGE */}
        <img
          src={
            appointment.user.profileImage ? appointment.user.profileImage : Img
          }
          alt=""
        />

        {/* USER INFO CONTAINER */}
        <div className="info">
          <h2>{appointment.user.username}</h2>
          <p>Appointment reason: {appointment.reason}</p>

          {/* APPOINTMENT STATUS AND DATE */}
          {appointmentStatus === "joined" ? (
            <>
              <p className="started">Appointment started</p>
              <p className="finish">Ends at {expiryTime}</p>
            </>
          ) : appointmentStatus === "finished" ? (
            <p className="finish">Session ended</p>
          ) : (
            // If appointment is yet to start, show appointment date
            <Date
              setRescheduledDate={setRescheduledDate}
              date={appointment.date}
              setShowRescheduleAppointment={setShowRescheduleAppointment}
              allowReschedule={true}
            />
          )}

          {/* BUTTONS */}
          <ButtonsWrapper>
            {/* show 'Cancel Appointment' if appointment is yet to start */}
            {appointmentStatus === "early" ? (
              <Button
                type="danger"
                text="Cancel Appointment"
                action={handleCancelAppointment}
              />
            ) : // show 'Delete Appointment' if appointment finished
            appointmentStatus === "finished" ? (
              <Button
                type="danger"
                text="Delete Appointment"
                action={() => autoCancelAppointment(appointment._id)}
              />
            ) : (
              // show 'Join Appointment' if appointment started
              <Button
                type="primary"
                text="Join Appointment"
                action={() => joinAppointment(appointment)}
              />
            )}
          </ButtonsWrapper>
        </div>
      </Wrapper>

      {/* RESCHEDULE APPOINTMENT CONTAINER */}
      {showRescheduleAppointment && (
        <Reschedule
          rescheduledDate={rescheduledDate}
          setShow={setShowRescheduleAppointment}
          setRescheduledDate={setRescheduledDate}
          rescheduleAppointment={() => rescheduleAppointment(appointment._id)}
        />
      )}

      {/* CANCEL APPOINTMENT CONFIRMATION CONTAINER */}
      {showConfirmCancel && (
        <ConfirmTab
          cta="Yes"
          type="danger"
          cancelText="No"
          setShow={setShowConfirmCancel}
          promptText={confirmCancelMessage}
          action={() => cancelAppointment(appointment._id)}
        />
      )}
    </>
  );
};

export default Appointment;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid #d1d1d1;
  padding: 1.5rem 0;

  img {
    border-radius: 50%;
    max-width: 75px;
    min-width: 75px;
    height: 75px;
    object-fit: cover;
  }

  .info {
    width: 100%;
    padding-left: 1.5rem;

    h2 {
      font-size: 22px;
      line-height: 26px;
      margin-top: 0.75rem;
    }
    p {
      line-height: 20px;
      margin: 0.25rem 0;
    }
    .started,
    .finish {
      font-weight: 600;
    }
    .started {
      color: #2d59eb;
    }
    .finish {
      color: #f95f5f;
      margin: 0 0 1rem;
    }
  }

  @media (max-width: 860px) {
    padding: 1.25rem 0;
    flex-direction: column;

    img {
      max-width: 60px;
      min-width: 60px;
      height: 60px;
    }

    .info {
      padding-left: 0;
      padding-top: 0.5rem;

      h2 {
        font-size: 16px;
        line-height: 20px;
      }
      p {
        font-size: 12px;
        line-height: 16px;
      }
    }
  }
`;

const ButtonsWrapper = styled.div`
  display: flex;
  justify-self: flex-end;

  button {
    min-width: 97px;
  }
  button:nth-child(1) {
    margin-right: 0.5rem;
  }

  @media (max-width: 860px) {
    button {
      min-width: 75px;
    }
    button:nth-child(1) {
      margin-right: 0.35rem;
    }
  }
`;
