import React from "react";
import styled, { css } from "styled-components";
import { InputStyles, InputStylesDark } from "./ShortInput";

const StyledTextArea = styled.textarea`
  ${InputStyles}
  width: 100%;
  min-height: 160px;
  resize: none;
`;

const TextArea: React.FC<any> = props => {
  return (
    <StyledTextArea
      className={props.error?.type}
      onChange={() => {
        !props.isValid &&
          typeof props.clearError == "function" &&
          props.clearError();
      }}
      name={props.name}
      ref={props.register}
      placeholder={props.placeholder}
    />
  );
};
export default TextArea;
