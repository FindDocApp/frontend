import React, { useContext } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../context/User";
import Booking from "./Booking";

const Bookings = ({ bookings, confirmBooking, role }) => {
  const navigate = useNavigate();

  // Get user info state from user context
  const { userInfo } = useContext(UserContext);

  return (
    <Wrapper role={userInfo.role}>
      {/* HEADING */}
      <Header>
        <h2>Recent Bookings</h2>
        <button
          onClick={() => navigate(`/dashboard/${userInfo.role}/bookings`)}
        >
          view all
        </button>
      </Header>

      {/* BOOKINGS LIST CONTAINER */}
      <div className="flex flexColumn">
        {bookings.length > 0 ? (
          bookings.map((booking) => {
            return (
              <Booking
                role={role}
                key={booking._id}
                booking={booking}
                confirmBooking={() => confirmBooking(booking._id)}
              />
            );
          })
        ) : (
          <p className="no-results">No recent bookings found</p>
        )}
      </div>
    </Wrapper>
  );
};

export default Bookings;

const Wrapper = styled.div`
  width: 33vw;
  max-width: 500px;
  min-width: 425px;
  min-height: ${({ role }) => (role === "doctor" ? "275px" : "600px")};
  background-color: #fff;
  padding: 1.25rem 1.5rem;
  margin: 0.75rem 0;
  margin-bottom: 1rem;
  border-radius: 10px;
  box-shadow: 0 10px 25px -15px #2525252e;

  @media (max-width: 1200px) {
    width: 550px;
    min-height: 275px;
    margin-bottom: 0.75rem;
  }
  @media (max-width: 860px) {
    width: 100%;
    max-width: 400px;
    min-width: 275px;
    padding: 1rem 1.25rem;
    margin: 0.25rem auto 0.75rem;

    .no-results {
      font-size: 12px;
    }
  }
`;

const Header = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  align-items: center;

  h2 {
    font-size: 20px;
    font-weight: 600;
  }
  button {
    cursor: pointer;
    outline: none;
    border: none;
    font-size: 16px;
    color: #808080;
    background-color: transparent;
    padding: 0;
    transition: all 0.1s ease;

    &:hover {
      color: #686666;
    }
  }

  @media (max-width: 860px) {
    h2 {
      font-size: 16px;
    }
    button {
      font-size: 12px;
    }
  }
`;
