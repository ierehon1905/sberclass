import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { colors } from '../../../utils/theme';
import { Widget } from '.';

export const InputStyles = css`
  border: 2px solid #b5b9c7;
  box-sizing: border-box;
  border-radius: 16px;
  padding: 15px;
  outline: none;
  font-family: Ubuntu;
  font-weight: 500;
  font-size: 18px;
  line-height: 25px;
  background: ${colors.light};
  transition: 0.2s;
  color: ${colors.gray6};
  &::placeholder {
    color: #b5b9c7;
  }
  :hover {
    border: 2px solid #9799a4;
  }
  :focus {
    border: 2px solid #9799a4;
    background: ${colors.white};
  }
  &.isWrong {
    border: 2px solid ${colors.red};
    color: ${colors.red};
  }
  &.isRight {
    border: 2px solid ${colors.red};
    color: ${colors.blue};
  }
`;

export const InputStylesDark = css`
  border: 2px solid #b5b9c7;
  background: transparent !important;
  color: #fff;
  &::placeholder {
    color: #b5b9c7;
  }
  :hover {
    border: 2px solid #e1e3e7;
  }
  :focus {
    border: 2px solid #e1e3e7;
    background: transparent;
  }
`;

const Input = styled.input`
  ${InputStyles}
  width: 100%;
  max-width: 190px;
`;
const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  label {
    width: 100%;
    font-weight: bold;
    font-size: 18px;
    line-height: 150%;
    margin-right: 30px;
  }
`;

const ShortInput: React.FC<any> = props => {
  const [value, setValue] = useState('');
  const [status, setStatus] = useState('');
  const handleChange = e => {
    !props.isValid && props.clearError();
    setValue(e.target.value);
    if (
      props.answer !== null &&
      props.validateOnBlur &&
      props.answer == e.target.value
    ) {
      setStatus('isRight');
    } else {
      setStatus('');
    }
  };
  const handleBlur = () => {
    if (props.validateOnBlur && props.answer !== null) {
      if (props.answer == value) {
        setStatus('isRight');
      } else {
        if (value != '') {
          setStatus('isWrong');
        }
      }
    }
  };
  useEffect(() => {
    if (props.error?.type == 'isWrong') {
      setStatus('isWrong');
    } else {
      setStatus('');
    }
  }, [props.error]);

  useEffect(() => {
    if (props.error?.type == 'isWrong') {
      setStatus('isWrong');
    } else {
      setStatus('');
    }
  }, [props.error]);
  return (
    <Wrapper>
      {props.label && (
        <label
          htmlFor={props.name}
          style={{ width: props.short ? '25%' : '100%' }}
        >
          {props.label}
        </label>
      )}
      <Input
        className={status}
        onChange={handleChange}
        onBlur={handleBlur}
        name={props.name}
        id={props.name}
        ref={props.register}
        placeholder={props.placeholder}
      />
    </Wrapper>
  );
};

export default ShortInput;
