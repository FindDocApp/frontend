import React from "react";
import styled from "styled-components";
// Components
import Message from "./Message";

const Chat = ({ messages, channelId, chatRef }) => {
  return (
    <Wrapper ref={chatRef}>
      {/* MESSAGES LIST */}
      {messages.map((message, i) => {
        return (
          <Message
            key={`message-${i}`}
            message={message}
            channelId={channelId}
          />
        );
      })}
    </Wrapper>
  );
};

export default Chat;

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  height: 450px;
  padding: 1.5rem 1.5rem 0.5rem;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #cecfd2;
    border-radius: 6px;
  }
  s @media (max-width: 860px) {
    height: 380px;
    padding: 1rem 1rem 0;
  }
`;
