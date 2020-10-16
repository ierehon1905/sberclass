import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import editScr from "./Edit.svg";
import settingsSrc from "./Settings.svg";
import gridSrc from "./Grid.svg";
import listSrc from "./List.svg";

const StyledNavbar = styled.nav`
  display: flex;
  flex-direction: column;
  font-size: 8px;
  width: 60px;
  text-align: center;
  a {
    height: 60px;
  }
  .nav-active {
    color: ${p => p.theme.blue};
    > img {
      display: inline-block;
    }
  }
`;

export default () => {
  return (
    <StyledNavbar>
      <NavLink to="/flow" activeClassName="nav-active">
        <img src={gridSrc} alt="" />
        <div>Конструктор</div>
      </NavLink>
      <NavLink to="/edit-page" activeClassName="nav-active">
        <img src={editScr} alt="" />
        <div>Редактор</div>
      </NavLink>
      <NavLink to="/data" activeClassName="nav-active">
        <img src={listSrc} alt="" />
        <div>Данные</div>
      </NavLink>
      <NavLink to="/settings" activeClassName="nav-active">
        <img src={settingsSrc} alt="" />
        <div>Настройки</div>
      </NavLink>
    </StyledNavbar>
  );
};
