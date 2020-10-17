import React from "react";
import styled from "styled-components";
import Logo from '../images/Logo.svg'
import Slash from '../images/Slash.svg'
import SmartFlowLogo from '../images/SmartFlowLogo.svg'

const StyledHeader = styled.header`
  height: 60px;
  background: #FFFFFF;
  box-shadow: 0px 4px 28px rgba(52, 58, 69, 0.1);
  display: flex;
  align-items: center;
  padding: 0 20px;
  .logo {
    width: auto;
    height: 28px
  }
  .slash {
    width: auto;
    height: 28px

  }
  .sub-logo {
    width: auto;
    height: 18px

  }
  img {
    margin-right: 10px;
  }
`;

export const Header: React.FC<any> = props => (
  <StyledHeader {...props}>
        <img className='logo' src={Logo} alt="" />
        <img className='slash' src={Slash} alt="" />
        <img className='sub-logo' src={SmartFlowLogo} alt="" />
  </StyledHeader>
);
