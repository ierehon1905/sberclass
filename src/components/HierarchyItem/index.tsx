import React, { useRef, useState } from "react";
import styled, { css } from "styled-components";
import moduleSrc from "./Module.svg";
import pageSrc from "./Page.svg";
import sectionSrc from "./Section.svg";
import arrowSrc from "./Arrow.svg";
import { useDispatch } from "react-redux";
import { flowSlice, workSlice } from "../../store";

const StyledHierarchyItem = styled.div`
  color: ${p => p.theme.darkGray};
  cursor: pointer;

  position: relative;

  &.has-toggle:not(.is-toggled) .toggle-arrow {
    transform: rotate(-90deg);
  }
  &.has-toggle.is-toggled .toggle-arrow {
    transition: transform 0.2s ease;
  }

  &.selected,
  &.selected:hover {
    background-color: ${p => p.theme.light};
    color: ${p => p.theme.blue};
  }

  &:hover {
    background-color: ${p => p.theme.gray4};

    /* &::after {
      opacity: 0.5;
      content: "●●●";
      position: absolute;
      right: 0;
      &:hover {
        opacity: 1;
      }
    } */
  }
  &:hover .ellipsis {
    opacity: 0.5;
  }
  .ellipsis {
    position: absolute;
    right: 0;
    opacity: 0;
    top: 0;
    &:hover {
      opacity: 1;
    }
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
  depth?: number;
  selected?: boolean;
};

const StyledMenu = styled.div`
  background-color: ${p => p.theme.white};
  padding: 8px;s
`;

const Menu = (props: {
  onDeletePage: () => void;
  onCreatePage: () => void;
  id: string;
}) => (
    <StyledMenu>
      <div>
        <button onClick={props.onDeletePage}>Удолить</button>
      </div>
      <div>
        <button onClick={props.onCreatePage}>Создать подстраницу</button>
      </div>
      <div>
        <a href={"/edit-page/" + props.id}>Редактировать</a>
      </div>
    </StyledMenu>
  );

export const HierarchyItem = (props: HierarchyItemProps) => {
  const [isMenu, setIsMenu] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch();

  const onSelectPage = () => {
    dispatch(workSlice.actions.selectPages([props.id]));
  };
  const onDeselectPage = () => {
    dispatch(workSlice.actions.deselectPages([props.id]));
  };
  const onDeletePage = () => {
    dispatch(flowSlice.actions.removePage(props.id));
  };
  const onCratePage = () => {
    dispatch(flowSlice.actions.addPage({ hierarchyParent: props.id }));
  };

  return (
    <StyledHierarchyItem
      ref={ref}
      className={
        (props.hasToggle ? "has-toggle" : "") +
        (props.isToggled ? " is-toggled" : "") +
        (props.selected ? " selected" : "")
      }
      style={{ paddingLeft: (props.depth || 0) * 32 }}
      // onMouseEnter={() => onSelectPage([props.id])}
      onClick={() => (!props.selected ? onSelectPage() : onDeselectPage())}
      onMouseLeave={() => {
        setIsMenu(false);
      }}
    >
      {props.hasToggle && (
        <img src={arrowSrc} className="toggle-arrow" alt="toggle arrow" />
      )}
      <img src={iconMap[props.type]} alt={props.type} />
      {props.title}
      <div
        className="ellipsis"
        onClick={e => {
          e.stopPropagation();
          setIsMenu(true);
          console.log("ELIPPSIS");
        }}
      >
        ●●●
        {isMenu && (
          <div style={{ position: "absolute", left: "100%", top: 0 }}>
            <Menu
              onDeletePage={onDeletePage}
              onCreatePage={onCratePage}
              id={props.id}
            />
          </div>
        )}
      </div>
    </StyledHierarchyItem>
  );
};

export type Nested = HierarchyItemProps & { nestedChildren?: Nested[] };

export type HierarchyProps = {
  hierarchy: Nested;
};

const Tree = (props: HierarchyProps & { depth: number }) => {
  const { nestedChildren, ...self } = props.hierarchy;
  return (
    <div>
      <HierarchyItem {...self} depth={props.depth} />
      {nestedChildren?.map(c => (
        <Tree hierarchy={c} key={c.id} depth={props.depth + 1} />
      ))}
    </div>
  );
};

export const Hierarchy = (props: HierarchyProps & { width?: number }) => {
  return (
    <div
      style={{
        width: props.width || 300,
        flexShrink: 0,
        position: "relative",
        zIndex: 10,
      }}
    >
      <h2>Hierarchy</h2>
      <Tree hierarchy={props.hierarchy} depth={0} />
    </div>
  );
};
