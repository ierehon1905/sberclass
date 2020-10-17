import React from 'react';
import styled from 'styled-components';

const Button: React.FC<any> = props => {
  return (
    <>
    <p onClick={props.onClick}>{props.title}</p>
    </>
  );
};
export default Button;
