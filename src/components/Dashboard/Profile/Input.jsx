import React from "react";
import styled from "styled-components";

const Input = ({ label, type, value, onChange }) => {
  return (
    <Wrapper>
      <label>{label}</label>
      <input
        type={type}
        value={value}
        // Use label in lowercase letters as input field name
        name={label.toLowerCase()}
        onChange={onChange}
      />
    </Wrapper>
  );
};

export default Input;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
