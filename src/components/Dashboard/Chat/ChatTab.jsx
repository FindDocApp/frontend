import React, { useState, useEffect, useCallback, useRef } from "react";
import styled from "styled-components";
import { usePubNub } from "pubnub-react";
// Components
import ConfirmTab from "../../Elements/ConfirmTab";
import Header from "./Header";
import Footer from "./Footer";
import Chat from "./Chat";

const ChatTab = ({
  channelId,
  setShowChatTab,
  appointment,
  setShowReviewTab,
  autoCancelAppointment,
}) => {
  const chatRef = useRef(null);

  const [showConfirmLeave, setShowConfirmLeave] = useState(false);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [channels] = useState([channelId]);
  const pubnub = usePubNub();

  // Handles new messages
  const handleMessage = useCallback((event) => {
    // Get message text from received event
    const message = event.message;

    // Check if message found
    if (typeof message === "string" || message.hasOwnProperty("text")) {
      // Add new message
      const text = message.text || message;
      setMessages((messages) => [...messages, text]);

      // Scroll to recent message
      goToRecentMessages();
    }
  }, []);

  // Sending a message through PubNub channel
  // PubNub React docs: https://www.pubnub.com/docs/sdks/react
  const sendMessage = useCallback(
    (message) => {
      if (message) {
        pubnub
          .publish({ channel: channels[0], message })
          .then(() => setMessage(""));
      }
    },
    [channels, pubnub]
  );

  // Get the last 100 messages of current PubNub channel
  // PubNub React docs: https://www.pubnub.com/docs/sdks/react
  const getMessages = useCallback(() => {
    pubnub.fetchMessages(
      {
        channels: channels,
        count: 100,
      },
      (status, response) => {
        // Handle fetching messages response
        if (status.statusCode === 200) {
          // Get current channel old messages
          let oldMessages = response.channels[channelId].map((message) => {
            return message.message;
          });

          // Add old messages to messages state
          setMessages(oldMessages);
          // Scroll to recent message
          goToRecentMessages();
        }
      }
    );
  }, [channelId, channels, pubnub]);

  // Scrolls to bottom of messages container
  const goToRecentMessages = () => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  };

  // Configure PubNub channel and messages event listener
  // PubNub React docs: https://www.pubnub.com/docs/sdks/react
  useEffect(() => {
    pubnub.addListener({ message: handleMessage });
    pubnub.subscribe({ channels });
  }, [pubnub, channels, handleMessage]);

  // Get old messages on component mount
  useEffect(() => {
    if (messages.length === 0) {
      getMessages();
    }
  }, [getMessages, messages.length]);

  return (
    <>
      <Wrapper>
        <Container>
          {/* HEADING (USER INFO AND LEAVE CHAT BUTTON)*/}
          <Header
            setShowChatTab={setShowChatTab}
            appointment={appointment}
            setShowConfirmLeave={setShowConfirmLeave}
          />

          {/* CHAT MESSAGES */}
          <Chat messages={messages} channelId={channelId} chatRef={chatRef} />

          {/* CHAT FOOTER (MESSAGE INPUT FIELD AND SEND MESSAGE BUTTON) */}
          <Footer
            sendMessage={sendMessage}
            message={message}
            setMessage={setMessage}
            appointment={appointment}
          />
        </Container>
      </Wrapper>

      {/* CONFIRM LEAVE CHAT CONTAINER */}
      {showConfirmLeave && (
        <ConfirmTab
          setShow={setShowConfirmLeave}
          promptText={`You will not be able to join this session again. Are you sure you want to leave?`}
          type="danger"
          cta="Leave"
          action={() => {
            autoCancelAppointment(appointment._id);
            setShowReviewTab(true);
            setShowChatTab(false);
          }}
        />
      )}
    </>
  );
};

export default ChatTab;

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #0b15361f;
  display: grid;
  place-items: center;
  padding: 0 1.5rem;
  z-index: 1;
`;

const Container = styled.main`
  width: 550px;
  height: 600px;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  box-shadow: 0 5px 25px -10px #2525252e;
  border-radius: 10px;
  overflow: hidden;

  @media (max-width: 860px) {
    width: 100%;
    max-width: 450px;
    height: 500px;
  }
`;
