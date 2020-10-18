import React, { useState } from "react";
import styled, { css } from "styled-components";
import constants from "../../utils/const";
import { colors, shadows } from "../../utils/theme";
import Icon from "../Icon";
import { Widget } from "./Widgets";

const Wrapper = styled.div<{
  withShadow?: boolean;
  isClickable?: boolean;
}>`
  position: relative;
  display: block;
  z-index: 8;
  padding: 12px ${constants.paddingX}px;
  font-size: 14px;
  background: ${colors.white};
  box-shadow: ${({ withShadow }) => (withShadow ? shadows.shadow3 : "none")};
  ${({ isClickable }) =>
    isClickable &&
    css`
      cursor: pointer;
    `}
  width: 100%;
  margin-bottom: 10px;
  transition: 0.3s ease;
  .content {
    opacity: 1;
  }
  img {
    width: 100%;
  }
`;

export const SideBarItem: React.FC<any> = props => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  return (
    <Wrapper {...props}>
      {/* <div className="icon-wrapper">
        <Icon className='collapse' size={16} glyph='collapse' />
        <Icon className='menu' size={16} glyph='menu' />
      </div> */}
      {props.type ? (
        <Widget {...props} />
      ) : (
        <div className="content">{props.children}</div>
      )}
    </Wrapper>
  );
};
