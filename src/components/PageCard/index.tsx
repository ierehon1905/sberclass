import React from "react";
import styled from "styled-components";
import { LessonPage } from "../../containers/Flow";

const StyledPageCard = styled.div`
  border: 2px solid ${p => p.theme.white};
  border-radius: 14px;
  background-color: ${p => p.theme.white};

  &.selected {
    background-color: ${p => p.theme.lightBlue};
    border-color: ${p => p.theme.lightBlue};
  }
  > .content {
    padding: 10px;
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

export const PageCard = (props: PageCardProps) => (
  <StyledPageCard className={props.selected ? "selected" : ""}>
    {props.thumbnail && (
      <div className="thumbnail-container">
        <img className="thumbnail" src={props.thumbnail} alt={props.title} />
      </div>
    )}
    <div className="content">
      <div>Название: {props.title}</div>
      <div>Путь: {props.path}</div>
      <a className="edit-btn" href={"/edit-page/" + props.id}>
        Редактировать страницу
      </a>
    </div>
  </StyledPageCard>
);
