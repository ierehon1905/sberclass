import React, { useState } from "react";
import styled from "styled-components";
import { GoToTrigger, LessonPage } from "../../containers/Flow";
import { PageButtonWithAnchor } from "../PageButton";
import pageSrc from "../HierarchyItem/Page.svg";
import { taskStatuses } from "../../containers/Release/tasks";
import Icon from "../Icon";

const StyledHeader = styled.div`
    position: relative;
    cursor: pointer;
    border-top: 1.5px solid ${p => p.theme.light2};
    padding: 14px 60px;
    transition: 0.3s ease;
    /* border-bottom: 2px solid ${p => p.theme.gray1}; */
    background-color: ${p => p.theme.white};
    &.visible {
        padding: 20px 60px;
    }
    &:first-child {
        border-top: 0;
    }
    /* box-shadow: 2px -2px 30px #eee; */
`;

const StyledContainer = styled.div`
  padding: 0 60px;
  transition: 0.3s ease;
  &.visible {
    padding: 0 60px 14px;
  }
`;

export type Props = {
  // onPageEdit: () => void;
  title: string;
  status?: taskStatuses;
  children: any;
  expanded?: boolean;
};

export const Spoiler = ({ title, status, expanded, children }: Props) => {
  const [visible, setVisible] = useState(expanded);

  return (
    <>
      <StyledHeader
        onClick={() => setVisible(!visible)}
        className={visible ? "visible" : ""}
      >
        <Icon
          style={{
            position: "absolute",
            transition: "0.3s ease",
            transform: visible ? "rotate(0deg)" : "rotate(-90deg)",
            left: 20,
            top: visible ? 20 : 16,
          }}
          glyph="down-simply"
        />
        <h3>{title}</h3>
        {status && (
          <Icon
            style={{ position: "absolute", right: 60, top: 16 }}
            glyph={status}
            isColored
          />
        )}
      </StyledHeader>
      <StyledContainer className={visible ? "visible" : ""}>
        {visible && children}
      </StyledContainer>
    </>
  );
};
