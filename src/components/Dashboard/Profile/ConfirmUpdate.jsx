import React from "react";
import styled from "styled-components";
// Components
import Button from "../../Buttons/Button";
import Input from "./Input";

const ConfirmUpdate = ({
  updateUser,
  setPassword,
  password,
  setShow,
}) => {
  return (
    <Wrapper>
      {/* CLOSE OVERLAY ( HIDES COMPONENT ON CLICK ) */}
      <CloseOverlay onClick={() => setShow(false)}></CloseOverlay>

      {/* CONFIRM PROFILE UDPDATE CONTAINER */}
      <Container>
        <Input
          label="Enter the password to update your profile"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Buttons>
          <Button
            text="Cancel"
            type="secondary"
            action={() => setShow(false)}
          />
          <Button text="Confirm" type="primary" action={updateUser} />
        </Buttons>
      </Container>
    </Wrapper>
  );
};

export default ConfirmUpdate;

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
  width: 400px;
  display: flex;
  flex-direction: column;
  padding: 1.25rem 1.5rem;
  background-color: #fff;
  box-shadow: 0 5px 25px -10px #2525252e;
  border-radius: 10px;

  label {
    font-weight: 600;
  }
  input {
    background-color: #eceff5;
    border: none;
    outline: none;
    padding: 0.75rem 1.25rem;
    font-size: 16px;
    border-radius: 5px;
    margin-bottom: 1.25rem;
  }
  button {
    margin: 0.25rem 0;
  }

  @media (max-width: 860px) {
    width: 100%;
    max-width: 300px;
    padding: 1rem 1.25rem;

    label {
      font-size: 12px;
    }
    input {
      font-size: 12px;
      padding: 0.6rem 1rem;
      margin-bottom: 1rem;
    }
    button {
      margin: 0.25rem 0 0.25rem;
    }
  }
`;

const Buttons = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;

  .secondary {
    margin-right: 0.5rem;
  }
`;
