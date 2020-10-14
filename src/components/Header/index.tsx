import React from "react";
import styled from "styled-components";

const StyledHeader = styled.header``;

export const Header: React.FC<any> = props => (
  <StyledHeader {...props}>Ad Astrum</StyledHeader>
);
