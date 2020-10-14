import React from "react";
import styled from "styled-components";
import moduleSrc from "./Module.svg";
import pageSrc from "./Page.svg";
import sectionSrc from "./Section.svg";
import arrowSrc from "./Arrow.svg";

const StyledHierarchyItem = styled.div`
  color: ${p => p.theme.darkGray};

  &.has-toggle:not(.is-toggled) .toggle-arrow {
    transform: rotate(-90deg);
  }
  &.has-toggle.is-toggled .toggle-arrow {
    transition: transform 0.2s ease;
  }
`;

const iconMap: { [key in HierarchyItemProps["type"]]: string } = {
  module: moduleSrc,
  page: pageSrc,
  section: sectionSrc,
};

export type HierarchyItemProps = {
  title: string;
  id: string;
  hasToggle?: boolean;
  isToggled?: boolean;
  icon?: string;
  type: "module" | "section" | "page";
};

export const HierarchyItem = (props: HierarchyItemProps) => (
  <StyledHierarchyItem
    className={
      (props.hasToggle ? "has-toggle" : "") +
      (props.isToggled ? " is-toggled" : "")
    }
  >
    {props.hasToggle && (
      <img src={arrowSrc} className="toggle-arrow" alt="toggle arrow" />
    )}
    <img src={iconMap[props.type]} alt={props.type} />
    {props.title}
  </StyledHierarchyItem>
);
