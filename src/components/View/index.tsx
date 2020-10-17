import styled from "styled-components";
import constants from "../../utils/const";

const View = styled.div<{
  withLeftSideBar?: boolean;
  withRightSideBar?: boolean;
}>`
  position: fixed;
  left: ${({ withLeftSideBar }) =>
    constants.navBarWidth + (withLeftSideBar ? constants.sideBarWidth : 0)}px;
  right: ${({ withRightSideBar }) =>
    withRightSideBar ? constants.sideBarWidth : 0}px;
  top: ${constants.navBarWidth}px;
  overflow: auto;
  bottom: 0;
`;

export default View;
