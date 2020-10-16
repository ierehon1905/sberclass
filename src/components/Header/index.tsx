import React from "react";
import styled from "styled-components";

const StyledHeader = styled.header``;

export const Header: React.FC<any> = props => (
  <StyledHeader {...props}>
    <h1>Сбер Класс</h1>
  </StyledHeader>
);
