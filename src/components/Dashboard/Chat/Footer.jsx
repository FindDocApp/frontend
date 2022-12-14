import React, { useContext } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UserContext } from "../../../context/User";
// Icons
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

const Footer = ({ sendMessage, message, setMessage }) => {
  // Get user info state from user context
  const { userInfo } = useContext(UserContext);

  // Handles sent message text
  const handleSend = () => {
    // Send message if not empty
    if (message.trim().length > 0) {
      // Add sender's name to sent message
      sendMessage(`${userInfo.username}: ${message}`);
    }

    // Reset message input
    setMessage("");
  };

  return (
    <Wrapper>
      {/* MESSAGE INPUT FIELD */}
      <input
        type="text"
        placeholder="type your message"
        value={message}
        onKeyPress={(e) => {
          if (e.key !== "Enter") return;
          handleSend();
        }}
        onChange={(e) => setMessage(e.target.value)}
      />

      {/* SEND MESSAGE BUTTON */}
      <button onClick={handleSend}>
        <FontAwesomeIcon icon={faPaperPlane} />
      </button>
    </Wrapper>
  );
};

export default Footer;

const Wrapper = styled.footer`
  height: 75px;
  display: flex;
  justify-self: flex-end;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.25rem;

  input {
    width: 100%;
    font-size: 16px;
    padding: 1rem 1.75rem;
    border-radius: 30px;
    background-color: #f3f4fa;
  }
  button,
  input {
    border: none;
    outline: none;
  }
  button {
    margin-left: 1.25rem;
    cursor: pointer;
    background-color: transparent;
    height: 50px;
    width: 50px;
    min-width: 50px;
    border-radius: 30px;
    color: #2d59eb;
    border: 1px solid #2d59eb;
    transition: all 0.2s ease;

    svg {
      font-size: 16px;
      position: relative;
      left: -1px;
      top: -0.5px;
    }

    &:hover {
      background-color: #2d59eb;
      color: #fff;
    }
  }

  @media (max-width: 860px) {
    height: 60px;
    padding: 0 1rem;

    input {
      font-size: 12px;
      padding: 0.81rem 1.25rem;
    }
    button {
      margin-left: 1rem;
      height: 40px;
      width: 40px;
      min-width: 40px;
      border-radius: 30px;

      svg {
        font-size: 12px;
        left: -1px;
        top: -0.5px;
      }
    }
  }
`;
