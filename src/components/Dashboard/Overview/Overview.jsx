import React, { useState, useEffect, useCallback, useContext } from "react";
import styled from "styled-components";
import { getFormatedDate, isAppointmentDate } from "../../../utils/date";
import { UserContext } from "../../../context/User";
import { post, get } from "../../../utils/fetch";
// Components
import SuccessMessage from "../../Elements/SuccessMessage";
import { ProgressBar } from "react-loader-spinner";
import ReviewTab from "../../Elements/ReviewTab";
import Appointments from "./Appointments";
import ChatTab from "../Chat/ChatTab";
import Bookings from "./Bookings";
import Reviews from "./Reviews";

// Default content state
const defaultContent = {
  bookings: [],
  appointments: [],
  reviews: [],
};

const Overview = () => {
  // Get user info state from user context
  const { userInfo } = useContext(UserContext);

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showReviewTab, setShowReviewTab] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [content, setContent] = useState(defaultContent);
  const [showChatTab, setShowChatTab] = useState(false);
  const [appointment, setAppointment] = useState({});
  const [channelId, setChannelId] = useState("");
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);

  // Updates booking status to confirmed in database
  const confirmBooking = async (bookingId) => {
    setLoading(true);

    // API post request
    const data = await post(
      process.env.REACT_APP_API_HOST + "dashboard/confirm-appointment",
      { appointment_id: bookingId }
    );

    // Reset state
    setLoading(false);

    // Handle API response
    if (data.status === "ok") {
      setShowSuccessMessage(true);
      setSuccessMessage("Booking successfully confirmed");
      // Refresh overview page
      setRefresh(!refresh);
    } else {
      alert(data.error);
    }
  };

  // Delete appointment from database
  const autoCancelAppointment = async (appointmentId) => {
    // API post request
    const data = await post(
      process.env.REACT_APP_API_HOST + "dashboard/delete-appointment",
      { appointment_id: appointmentId }
    );

    // Handle API response
    if (data.status === "ok") {
      // Refresh overview page
      setRefresh(!refresh);
    } else {
      alert(data.error);
    }
  };

  // Join appointment chat
  const joinAppointment = (appointment) => {
    let didAppointmentStart = isAppointmentDate(appointment);

    // Check if appointment started | finished | yet to start
    if (!didAppointmentStart.status) {
      if (didAppointmentStart.message === "early") {
        alert("You can not join before " + appointment.date);
      }

      // Delete appointment by default from database if finished
      if (didAppointmentStart.message === "finished") {
        let expiryTime = getFormatedDate(
          didAppointmentStart.expiryTime.toString()
        );
        alert("Session finished at " + expiryTime);
        autoCancelAppointment(appointment._id);
      }

      return;
    }

    // Set appointment to join
    setAppointment(appointment);
    // Set appointment id as chat channel id to allow
    // the patient and doctor join the same room
    setChannelId(appointment._id);
    // Open chat tab to join user chat room
    setShowChatTab(true);
  };

  // Get overview content from database
  // In appointments, if role = patient, returns appointments booked by patient
  // In appointments, if role = doctor, returns appointments booked for doctor
  // In bookings, if role = patient, returns bookings booked by patient
  // In bookings, if role = doctor, returns bookings booked for doctor
  // Reviews is displayed only if role = doctor
  const getContent = useCallback(async () => {
    // API get request
    // user id and role must be passed as a query in the get request url
    const data = await get(
      process.env.REACT_APP_API_HOST +
        "dashboard/overview?id=" +
        userInfo._id +
        "&role=" +
        userInfo.role
    );

    // Handle API response
    if (data.status === "ok") {
      let userContent =
        userInfo.role === "doctor"
          ? {
              // return bookings, appointments, and reviews if role = doctor
              // only firt 3 bookings are displayed
              bookings: data.content.bookings.filter(
                (item, index) => index < 3
              ).reverse(),
              // only firt 9 appointments are displayed
              appointments: data.content.appointments.filter(
                (item, index) => index < 9
              ).reverse(),
              // only firt 2 reviews are displayed
              reviews: data.content.reviews.filter((item, index) => index < 2).reverse(),
            }
          : {
              // return bookings, and appointments if role = patient
              bookings: data.content.bookings.filter(
                // only firt 3 bookings are displayed
                (item, index) => index < 3
              ).reverse(),
              appointments: data.content.appointments.filter(
                // only firt 9 appointments are displayed
                (item, index) => index < 9
              ).reverse(),
            };

      // Update content state
      setContent(userContent);
    } else {
      alert("Failed to fetch content");
    }
  }, [userInfo._id, userInfo.role]);

  useEffect(() => {
    // Get overview content from database on component mount
    getContent();

    // Clean up content state on component unmount
    return () => setContent(defaultContent);
  }, [getContent, refresh]);

  return (
    <>
      <Wrapper>
        <h1>Welcome, {userInfo.username}</h1>

        {/* CONTENT CONTAINER */}
        {/* If role = patient, patient bookings and appointments are displayed */}
        {/* If role = doctor, doctor bookings, reviews, and appointments are displayed */}
        <Container>
          {userInfo.role === "patient" ? (
            <div className="patient-bookings">
              {/* BOOKINGS */}
              <Bookings
                bookings={content.bookings}
                confirmBooking={confirmBooking}
                role="patient"
              />
            </div>
          ) : (
            <div className="group">
              {/* BOOKINGS */}
              <Bookings
                bookings={content.bookings}
                confirmBooking={confirmBooking}
                role="doctor"
              />

              {/* REVIEWS */}
              <Reviews reviews={content.reviews} />
            </div>
          )}

          {/* APPOINTMENTS */}
          <Appointments
            appointments={content.appointments}
            joinAppointment={joinAppointment}
          />

          {/* LOADER */}
          <Loader>
            <ProgressBar
              height="60"
              visible={loading}
              borderColor="#000"
              barColor="#2d59eb"
            />
          </Loader>
        </Container>
      </Wrapper>

      {/* SUCCESS MESSAGE CONTAINER */}
      {showSuccessMessage && (
        <SuccessMessage
          setShow={setShowSuccessMessage}
          message={successMessage}
        />
      )}

      {/* APPOINTMENT CHAT CONTAINER */}
      {showChatTab && (
        <ChatTab
          channelId={channelId}
          setShowChatTab={setShowChatTab}
          appointment={appointment}
          setShowReviewTab={setShowReviewTab}
          autoCancelAppointment={autoCancelAppointment}
        />
      )}

      {/* DOCTOR REVIEW PROMPT CONTAINER */}
      {showReviewTab && (
        <ReviewTab
          setShow={setShowReviewTab}
          appointment={appointment}
          setRefresh={setRefresh}
          refresh={refresh}
        />
      )}
    </>
  );
};

export default Overview;

const Wrapper = styled.div`
  h1 {
    text-align: center;
    font-size: 24px;
  }

  @media (max-width: 860px) {
    h1 {
      font-size: 18px;
    }
  }
`;

const Container = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;

  .patient-bookings {
    margin-right: 1rem;
  }
  .group {
    margin-right: 1rem;
  }

  @media (max-width: 1200px) {
    align-items: center;
    flex-direction: column-reverse;

    .group,
    .patient-bookings {
      margin-right: 0;
    }
  }

  @media (max-width: 860px) {
    .patient-bookings,
    .group {
      width: 100%;
    }
  }
`;

const Loader = styled.div`
  position: absolute;
  bottom: -4.5rem;
  left: 47.5%;

  @media (max-width: 1200px) {
    bottom: -4rem;
    left: 44%;
  }
  @media (max-width: 860px) {
    bottom: -4rem;
  }
  @media (max-width: 460px) {
    left: 40%;
  }
`;
