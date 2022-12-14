import React, { useContext } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UserContext } from "../../../context/User";
// Icons
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";

const Date = ({ setShowRescheduleAppointment, allowReschedule, date }) => {
  // Get user info state from user context
  const { userInfo } = useContext(UserContext);

  return (
    <Wrapper>
      <p>{date}</p>

      {/* RESCHEDULE APPOINTMENT BUTTON (FOR DOCTORS) */}
      {userInfo.role === "doctor" && allowReschedule && (
        <div
          className="reschedule"
          onClick={() => setShowRescheduleAppointment(true)}
        >
          <p>reschedule</p>
          <FontAwesomeIcon icon={faPenToSquare} />
        </div>
      )}
    </Wrapper>
  );
};

export default Date;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #808080;
  margin: 0 0 1rem;

  .reschedule {
    display: flex;
    color: #2d59eb;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.1s ease;

    svg {
      position: relative;
      top: 3px;
      padding-left: 0.35rem;
    }

    &:hover {
      color: #2248c5;
    }
  }

  @media (max-width: 860px) {
    margin: 0 0 0.75rem;

    .reschedule {
      svg {
        font-size: 12px;
        top: 3.5px;
        padding-left: 0.25rem;
      }
    }
  }
`;
