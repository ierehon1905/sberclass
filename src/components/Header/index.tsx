import React from "react";
import styled from "styled-components";

const StyledHeader = styled.header``;

export const Header: React.FC<any> = props => (
  <StyledHeader {...props}>
    <h1>Ad Astrum</h1>
  </StyledHeader>
);
