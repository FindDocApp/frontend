import React from "react";
import styled from "styled-components";
// Components
import Button from "../Buttons/Button";

const ConfirmTab = ({
  secondaryAction,
  promptText,
  cancelText,
  setShow,
  action,
  type,
  cta
}) => {
  return (
    <Wrapper>
      {/* CLOSE OVERLAY ( HIDES COMPONENT ON CLICK ) */}
      <CloseOverlay onClick={() => setShow(false)}></CloseOverlay>

      {/* CONFIRM PROMPT CONTAINER */}
      <Container>
        <p>{promptText}</p>
        <Buttons>
          <Button
            text={cancelText || "Cancel"}
            type="secondary"
            action={() => {
              secondaryAction && secondaryAction();
              setShow(false);
            }}
          />
          <Button text={cta} type={type} action={action} />
        </Buttons>
      </Container>
    </Wrapper>
  );
};

export default ConfirmTab;

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

const CloseOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
`;

const Container = styled.div`
  width: 450px;
  display: flex;
  flex-direction: column;
  padding: 1.25rem 1.5rem;
  background-color: #fff;
  box-shadow: 0 5px 25px -10px #2525252e;
  border-radius: 10px;

  p {
    font-size: 18px;
    font-weight: 600;
  }

  @media (max-width: 860px) {
    width: 100%;
    max-width: 300px;
    padding: 1rem 1.25rem;

    p {
      font-size: 14px;
    }
  }
`;

const Buttons = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: 1.25rem;

  .secondary {
    margin-right: 0.5rem;
  }
`;
