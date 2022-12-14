import React, { useState, useEffect, useCallback, useContext } from "react";
import styled from "styled-components";
import { getFormatedDate, isAppointmentDate } from "../../../utils/date";
import { UserContext } from "../../../context/User";
import { post, get } from "../../../utils/fetch";
// Components
import SuccessMessage from "../../Elements/SuccessMessage";
import ReviewTab from "../../Elements/ReviewTab";
import Loader from "../../Elements/Loader";
import Appointment from "./Appointment";
import ChatTab from "../Chat/ChatTab";

const Appointments = () => {
  // Get user info state from user context
  const { userInfo } = useContext(UserContext);

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showReviewTab, setShowReviewTab] = useState(false);
  const [rescheduledDate, setRescheduledDate] = useState();
  const [successMessage, setSuccessMessage] = useState("");
  const [showChatTab, setShowChatTab] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [appointment, setAppointment] = useState({});
  const [channelId, setChannelId] = useState("");
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);

  // Get appointments from Database
  // If role = patient, returns appointments booked by patient
  // If role = doctor, returns appointments booked for doctor
  const getAppointmens = useCallback(async () => {
    // API get request
    // user id and role must be passed as a query in the get request url
    const data = await get(
      process.env.REACT_APP_API_HOST +
        "dashboard/appointments?id=" +
        userInfo._id +
        "&role=" +
        userInfo.role
    );

    // Handle API response
    if (data.status === "ok") {
      setAppointments(data.appointments.reverse());
    } else {
      alert("Failed to fetch appointments");
    }
  }, [userInfo._id, userInfo.role]);

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

  // Delete appointment from database
  const cancelAppointment = async (appointmentId) => {
    setLoading(true);

    // API post request
    const data = await post(
      process.env.REACT_APP_API_HOST + "dashboard/delete-appointment",
      {
        appointment_id: appointmentId,
      }
    );

    // Reset state
    setLoading(false);

    // Handle API response
    if (data.status === "ok") {
      setShowSuccessMessage(true);
      setSuccessMessage("Appointment successfully canceled");
      // Refresh appointments page
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
      // Refresh appointments page
      setRefresh(!refresh);
    } else {
      alert(data.error);
    }
  };

  // Updates appointment date in database using passed appointment id
  const rescheduleAppointment = async (appointmentId) => {
    setLoading(true);

    // API post request
    const data = await post(
      process.env.REACT_APP_API_HOST + "dashboard/reschedule-appointment",
      {
        appointment_id: appointmentId,
        date: rescheduledDate,
      }
    );

    // Reset state
    setLoading(false);

    // Handle API response
    if (data.status === "ok") {
      setShowSuccessMessage(true);
      setSuccessMessage("Appointment successfully rescheduled");
      // Refresh appointments page
      setRefresh(!refresh);
    } else {
      alert(data.error);
    }
  };

  useEffect(() => {
    // Get appointments from database on component mount
    getAppointmens();

    // Clean up appointments state on component unmount
    return () => setAppointments([]);
  }, [getAppointmens, refresh]);

  return (
    <>
      <Wrapper>
        <h1>Scheduled Appointments</h1>

        {/* APPOINTMENTS LIST CONTAINER */}
        <Container itemsLength={appointments.length}>
          {appointments.length > 0 ? (
            appointments.map((appointment) => {
              return (
                <Appointment
                  role={userInfo.role}
                  key={appointment._id}
                  appointment={appointment}
                  rescheduledDate={rescheduledDate}
                  joinAppointment={joinAppointment}
                  cancelAppointment={cancelAppointment}
                  setRescheduledDate={setRescheduledDate}
                  rescheduleAppointment={rescheduleAppointment}
                  autoCancelAppointment={autoCancelAppointment}
                />
              );
            })
          ) : (
            <p className="no-results">No appointments found</p>
          )}

          {/* LOADER */}
          <Loader visible={loading} />
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

export default Appointments;

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
  width: 100%;
  max-width: 600px;
  min-height: 600px;
  background-color: #fff;
  padding: 1.25rem 1.5rem;
  margin: 0.75rem auto;
  border-radius: 10px;
  box-shadow: 0 10px 25px -15px #2525252e;

  .appointment:nth-child(1) {
    padding: 0.25rem 0 1.5rem;
  }
  .appointment:nth-child(${({ itemsLength }) => itemsLength}) {
    border-bottom: none;
  }
  .no-results {
    text-align: center;
  }

  @media (max-width: 860px) {
    max-width: 500px;
    padding: 1rem 1.25rem;
    margin: 0.25rem auto;

    .no-results {
      font-size: 12px;
    }
  }
`;
