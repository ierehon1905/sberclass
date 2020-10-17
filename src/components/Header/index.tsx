import React from "react";
import styled from "styled-components";
import { shadows } from "../../utils/theme";
import Logo from '../images/Logo.svg'
import Slash from '../images/Slash.svg'
import SmartFlowLogo from '../images/SmartFlowLogo.svg'

const StyledHeader = styled.header`
  position: fixed;
  display: block;
  width:100vw;
  z-index: 10;
  height: 60px;
  background: #FFFFFF;
  box-shadow: ${shadows.shadow3};
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
