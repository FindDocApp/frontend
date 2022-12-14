import React, { useState } from "react";
import styled from "styled-components";
import Img from "../../../assets/img/dashboard/profile-img.jpg";
import Button from "../../Buttons/Button";
import Date from "../Appointments/Date";
import ConfirmTab from "../../Elements/ConfirmTab";

const Booking = ({ booking, cancelBooking, role, confirmBooking }) => {
  const [confirmCancelMessage, setConfirmCancelMessage] = useState("");
  const [showConfirmCancel, setShowConfirmCancel] = useState(false);

  // Handles confirmation of booking cancel / decline
  const handleCancelBooking = () => {
    setShowConfirmCancel(true);
    setConfirmCancelMessage(`
      Are you sure you want to ${
        role === "patient" ? "cancel" : "decline"
      } this appointment?
    `);
  };

  return (
    <>
      {/* BOOKINGS CONTAINER */}
      <Wrapper className="booking">
        {/* USER PROFILE IMAGE */}
        <img
          src={booking.user.profileImage ? booking.user.profileImage : Img}
          alt=""
        />

        {/* USER INFO CONTAINER */}
        <div className="info">
          <h2>{booking.user.username}</h2>
          <p>Appointment reason: {booking.reason}</p>

          <Date allowReschedule={false} date={booking.date} />

          {/* BUTTONS */}
          <ButtonsWrapper>
            {role === "patient" ? (
              // Show 'Cancel Booking' if patient
              <Button
                type="danger"
                text="Cancel Booking"
                action={handleCancelBooking}
              />
            ) : (
              // Show 'Confirm' and 'Decline' if doctor
              <>
                <Button type="primary" text="Confirm" action={confirmBooking} />
                <Button
                  type="danger"
                  text="Decline"
                  action={handleCancelBooking}
                />
              </>
            )}
          </ButtonsWrapper>
        </div>
      </Wrapper>

      {/* CANCEL APPOINTMENT CONFIRMATION CONTAINER */}
      {showConfirmCancel && (
        <ConfirmTab
          cta="Yes"
          type="danger"
          cancelText="No"
          action={cancelBooking}
          setShow={setShowConfirmCancel}
          promptText={confirmCancelMessage}
        />
      )}
    </>
  );
};

export default Booking;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid #d1d1d1;
  padding: 1.5rem 0;

  img {
    border-radius: 50%;
    min-width: 75px;
    max-width: 75px;
    height: 75px;
    object-fit: cover;
  }

  .info {
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

  button:nth-child(1) {
    margin-right: 0.5rem;
  }

  @media (max-width: 860px) {
    button:nth-child(1) {
      margin-right: 0.35rem;
    }
  }
`;
