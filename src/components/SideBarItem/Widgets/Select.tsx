import React, { useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import { colors } from '../../../utils/theme';
import { InputStyles } from './ShortInput';
import ReactSelect from 'react-select';
import { Controller } from 'react-hook-form';

const Wrapper = styled.div`
  width: 100%;
  display: block;
  label {
    display: block;
    width: 100%;
    font-weight: bold;
    font-size: 18px;
    line-height: 150%;
    margin-bottom: 10px;
    margin-top: 30px;
  }
`;

const StyledSelect = styled(ReactSelect)`
  &.isWrong {
    .input-select {
      &__control,
      &__control:hover {
        border: 2px solid ${colors.red};
        color: ${colors.red};
      }
      &__menu {
        border: 2px solid ${colors.red};
      }
      &__option {
        &--is-selected {
          color: ${colors.red};
        }
      }
    }
  }
  .input-select {
    &__control {
      ${InputStyles}
      padding: 9px 8px;
      &--is-focused,
      &--is-focused:hover {
        border: 2px solid #b5b9c7;
        background: #fff;
        box-shadow: none;
      }
    }
    &__menu {
      top: -8px;
      border-radius: 16px;
      border: 2px solid ${colors.blue};
      box-shadow: 8px 24px 64px rgba(0, 0, 0, 0.42);
      overflow: hidden;
      padding: 6px 0;
    }
    &__option {
      color: ${colors.gray6};
      padding: 12px 16px;
      &--is-selected {
        color: ${colors.blue};
        font-weight: bold;
        background: transparent;
        &:hover {
          background: #dfebfd;
        }
      }
    }
  }
`;

const Select = props => {
  const inputRef = useRef();
  return (
    <Wrapper>
      {props.label && <label htmlFor={props.name}>{props.label}</label>}

      <Controller
        rules={props.rules}
        control={props.control}
        name={props.name}
        onFocus={() => {
          // @ts-ignore
          inputRef.current.focus();
        }}
        render={({ onChange, onBlur, value, name }) => {
          // const [result, setResult] = useState(null);
          // const setValue = value => {
          //   onChange(value.value);
          // };
          return (
            <StyledSelect
              ref={inputRef}
              className={props.error?.type}
              value={props.options.find(option => option.value === value)}
              onChange={value => {
                props.error && props.clearError();
                onChange(value.value || value);
              }}
              onMenuOpen={() => props.error && props.clearError()}
              onBlur={() => onBlur}
              name={name}
              classNamePrefix="input-select"
              // styles={customStyles}
              isSearchable={false}
              placeholder={props.placeholder}
              options={props.options.map(item => ({
                value: item,
                label: item,
              }))}
            />
          );
        }}
      />
    </Wrapper>
  );
};

export default Select;
