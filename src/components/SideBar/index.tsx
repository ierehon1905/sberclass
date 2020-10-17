import React, { useState } from "react";
import styled, { css } from "styled-components";
import { colors, shadows } from "../../utils/theme";
import Icon from "../Icon";
import Logo from '../images/Logo.svg'
import Slash from '../images/Slash.svg'
import SmartFlowLogo from '../images/SmartFlowLogo.svg'

const StyledSideBar = styled.div<{isCollapsed: boolean}>`
  position: fixed;
  left: 60px;
  top: 60px;
  display: block;
  z-index: 8;
  height: 100%;
  background: ${colors.white};
  box-shadow: ${shadows.shadow3};
  padding-top: 18px;
  width: 260px;
  transition: 0.3s ease;
  .content {
    opacity: 1;
  }
  .icon-wrapper {
    position: absolute;
    z-index: 9;
    right: 14px;
    top: 32px;
    padding: 8px;
    width: 32px;
    height: 32px;
    & > div {
      position: absolute;
      transition: 0.3s;
    }

    &:hover {
      & > div {
        background-color: ${colors.dark};
      }
    }
  }
  .menu {
    opacity: 0;
  }

  ${({isCollapsed})=> isCollapsed && css`
    transform: translateX(-200px);
    background: transparent;
    box-shadow: none;
    .content {
      opacity: 0.1;
    }
    .menu {
      opacity: 1;
    }
    .collapse {
      opacity: 0;
    }
    .icon-wrapper:hover {
      .menu {
        opacity: 0;
      }
      .collapse {
        opacity: 1;
        transform: rotateY(180deg);
      }
    }
  `}
`;

export const SideBar: React.FC<any> = props => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  return(
  <StyledSideBar {...props} isCollapsed={isCollapsed}>
      <div className="content">
        {props.children}
      </div>
      <div className="icon-wrapper" onClick={()=>setIsCollapsed(!isCollapsed)} >
        <Icon className='collapse' size={16} glyph='collapse' />
        <Icon className='menu' size={16} glyph='menu' />
      </div>
  </StyledSideBar>
)
};
