import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../../context/User";
import styled from "styled-components";

// default message state
const defaultState = {
  alignment: "flex-start",
  text: "",
  name: "",
};

const Message = ({ message }) => {
  // Get user info state from user context
  const { userInfo } = useContext(UserContext);

  const [data, setData] = useState(defaultState);

  useEffect(() => {
    // Split received messages to sender's name and message text
    let name = message.split(": ")[0];
    let text = message.split(": ")[1];

    // Set message alignment to the opposte side of the other user's messages
    let alignment = name === userInfo.username ? "flex-end" : "flex-start";
    name = name === userInfo.username ? "You" : "flex-start";

    // Save message data
    setData({ alignment, text, name });

    // Clean up message data on component unmount
    return () => setData(defaultState);
  }, [message, userInfo.username]);

  return (
    <Wrapper
      style={{
        alignSelf: data.alignment,
        backgroundColor:
          data.alignment === "flex-start" ? "#f3f4fa" : "#e9f2ff",
      }}
    >
      {/* SENDER'S NAME */}
      <h4 style={{ alignSelf: data.alignment }}>
        {/* If sender is current user, show 'You' instead of sender's username */}
        {message.split(": ")[0] === userInfo.username
          ? "You"
          : message.split(": ")[0]}
      </h4>
      {/* MESSAGE */}
      {/* align message to the opposite side of the other user's messages */}
      <p
        style={{
          textAlign: data.alignment === "flex-start" ? "left" : "right",
        }}
      >
        {message.split(": ")[1]}
      </p>
    </Wrapper>
  );
};

export default Message;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-self: flex-start;
  border-radius: 10px;
  padding: 0.6rem 1rem;
  margin-bottom: 0.75rem;

  h4 {
    font-size: 14px;
  }
  p {
    line-height: 20px;
  }

  @media (max-width: 860px) {
    border-radius: 7.5px;
    padding: 0.5rem 0.8rem;
    margin-bottom: 0.5rem;

    h4,
    p {
      font-size: 12px;
      line-height: 18px;
    }
  }
`;
