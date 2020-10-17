import React from "react";
import styled from "styled-components";
import { GoToTrigger, LessonPage } from "../../containers/Flow";
import { PageButtonWithAnchor } from "../PageButton";
import pageSrc from "../HierarchyItem/Page.svg";

const StyledPageCard = styled.div`
  border: 2px solid ${p => p.theme.white};
  border-radius: 14px;
  width: 320px;
  background-color: ${p => p.theme.white};

  &.selected {
    background-color: ${p => p.theme.light};
    border-color: ${p => p.theme.light};
  }
  > .content {
    padding: 10px;
  }

  .thumbnail-container {
    background-color: ${p => p.theme.gray1};
    text-align: center;
    border-radius: 12px;
  }

  .thumbnail {
    height: 174px;
  }

  .edit-btn {
    /* appearance: none; */
    display: block;
    text-align: center;
    color: ${p => p.theme.blue};
  }
`;

export type PageCardProps = LessonPage & {
  // onPageEdit: () => void;
};

export const PageCard = (props: PageCardProps) => {
  return (
    <StyledPageCard className={props.selected ? "selected" : ""}>
      <div className="thumbnail-container">
        <img
          className={"thumbnail " + (props.thumbnail ? "" : "fallback")}
          src={props.thumbnail || pageSrc}
          alt={props.title}
        />
      </div>

      <div className="content">
        <div>Название: {props.title}</div>
        <div>Путь: {props.path}</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {props.triggers?.map(tr => (
            <PageButtonWithAnchor
              key={tr.id}
              id={tr.id}
              active={!!(tr as GoToTrigger).goToPageId}
            >
              {tr.title}
            </PageButtonWithAnchor>
          ))}
        </div>
        <a className="edit-btn" href={"/edit-page/" + props.id}>
          Редактировать страницу
        </a>
      </div>
    </StyledPageCard>
  );
};
