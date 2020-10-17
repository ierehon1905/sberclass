import React from "react";
import styled from "styled-components";

const StyledPageButton = styled.button`
  appearance: none;
  height: 40px;
  color: ${p => p.theme.gray6};
  padding: 8px 14px;
  font-size: 14px;
  background: ${p => p.theme.white};
  border: 1.5px solid ${p => p.theme.gray2};
  border-radius: 7px;
  position: relative;

  &.with-anchor {
    padding-right: 30px;
  }

  .anchor {
    position: absolute;
    top: calc(50% - 7px);
    right: 10px;
    height: 14px;
    width: 14px;
    border: 1.5px solid ${p => p.theme.gray2};
    border-radius: 50%;
    &.active {
      &::after {
        content: "";
        position: absolute;
        height: 8px;
        width: 8px;
        left: 1.5px;
        top: 1.5px;
        border-radius: inherit;
        background-color: ${p => p.theme.gray2};
      }
    }
  }
`;

export const PageButton: React.FC<any> = props => (
  <StyledPageButton {...props}></StyledPageButton>
);

export const PageButtonWithAnchor: React.FC<{
  active?: boolean;
  id?: string;
}> = props => (
  <PageButton className="with-anchor">
    {props.children}
    <div
      className={"anchor" + (props.active ? " active" : "")}
      id={"anchor-" + props.id}
    ></div>
  </PageButton>
);
