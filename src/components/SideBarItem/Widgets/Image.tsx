import React from 'react';
import styled from 'styled-components';

const Img = styled.img`
  width: 100%;
  height: auto;
`;

const Image: React.FC<any> = props => {
  //  const newProps = {props.};
  return <Img style={props.style} src={props.src} alt="" />;
};
export default Image;
