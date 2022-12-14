import React, { useState, useEffect, useCallback, useContext } from "react";
import styled from "styled-components";
import { UserContext } from "../../../context/User";
import { post, get } from "../../../utils/fetch";
// Components
import SuccessMessage from "../../Elements/SuccessMessage";
import Loader from "../../Elements/Loader";
import Booking from "./Booking";

const Bookings = () => {
  // Get user info state from user context
  const { userInfo } = useContext(UserContext);

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);

  // Get bookings from Database
  // If role = patient, returns bookings booked by patient
  // If role = doctor, returns bookings booked for doctor
  const getBookings = useCallback(async () => {
    // API get request
    // user id and role must be passed as a query in the get request url
    const data = await get(
      process.env.REACT_APP_API_HOST +
        "dashboard/bookings?id=" +
        userInfo._id +
        "&role=" +
        userInfo.role
    );

    // Handle API response
    if (data.status === "ok") {
      setBookings(data.bookings.reverse());
    } else {
      alert("Failed to fetch bookings");
    }
  }, [userInfo._id, userInfo.role]);

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
      // Refresh bookings page
      setRefresh(!refresh);
    } else {
      alert(data.error);
    }
  };

  // Delete bookings from database
  const cancelBooking = async (bookingId) => {
    setLoading(true);

    // API post request
    const data = await post(
      process.env.REACT_APP_API_HOST + "dashboard/delete-appointment",
      { appointment_id: bookingId }
    );

    // Reset state
    setLoading(false);

    // Handle API response
    if (data.status === "ok") {
      setShowSuccessMessage(true);
      setSuccessMessage(
        `Booking successfully ${
          userInfo.role === "patient" ? "canceled" : "declined"
        }`
      );
      // Refresh bookings page
      setRefresh(!refresh);
    } else {
      alert(data.error);
    }
  };

  useEffect(() => {
    // Get bookings from database on component mount
    getBookings();

    // Clean up bookings state on component unmount
    return () => setBookings([]);
  }, [getBookings, refresh]);

  return (
    <>
      <Wrapper>
        <h1>Recent Bookings</h1>

        {/* BOOKINGS LIST CONTAINER */}
        <Container itemsLength={bookings.length}>
          {bookings.length > 0 ? (
            bookings.map((booking) => {
              return (
                <Booking
                  key={booking._id}
                  booking={booking}
                  role={userInfo.role}
                  cancelBooking={() => cancelBooking(booking._id)}
                  confirmBooking={() => confirmBooking(booking._id)}
                />
              );
            })
          ) : (
            <p className="no-results">No bookings found</p>
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
    </>
  );
};
export default Bookings;

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
  max-width: 600px;
  min-height: 600px;
  background-color: #fff;
  padding: 1.25rem 1.5rem;
  margin: 0.75rem auto;
  border-radius: 10px;
  box-shadow: 0 10px 25px -15px #2525252e;

  .booking:nth-child(1) {
    padding: 0.25rem 0 1.5rem;
  }
  .booking:nth-child(${({ itemsLength }) => itemsLength}) {
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
