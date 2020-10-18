import React from "react";
import moment from "moment";
import { RevisionSelector } from "./RevisionSelector";
import { TaskControls } from "./TaskControls";
import styled from "styled-components";
import Icon from "../../../components/Icon";
import { colors } from "../../../utils/theme";
import { InputStyles } from "../../../components/SideBarItem/Widgets/ShortInput";
import { taskTypeToRussian } from "../../../utils/interpreter";

const StyledWrap = styled.div`
  padding: 26px 60px;
  flex-direction: row;
  align-items: center;
  min-height: 134px;

  border-bottom: 1.5px solid ${p => p.theme.light2};
`;

const StyledHeading = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 12px;
`;

export const StyledDate = styled.div`
  font-weight: normal;
  font-size: 14px;
  line-height: 140%;
  color: ${colors.gray4};
  & > div {
    display: inline-block;
    transform: translateY(3px);
    margin-right: 4px;
    margin-left: -2px;
  }
`;

const RightControlsWrapper = styled.div`
  position: absolute;
  top: 22px;
  right: 60px;
`;

export const TaskHeader = (props: any) => {
  const { task } = props;
  const { state } = task;

  return (
    <StyledWrap>
      <StyledHeading>{taskTypeToRussian(task.type)}</StyledHeading>
      {state.startedAt && (
        <StyledDate>
          <Icon glyph="start" size={16} />
          {moment(state.startedAt).format("DD-MM-YYYY hh:mm:ss")}
        </StyledDate>
      )}

      {state.finishedAt && (
        <StyledDate>
          <Icon glyph="end" size={16} />
          {moment(state.finishedAt).format("DD-MM-YYYY hh:mm:ss")}
        </StyledDate>
      )}
      <RightControlsWrapper>
        <RevisionSelector {...props} />
        <TaskControls {...props} />
      </RightControlsWrapper>
    </StyledWrap>
  );
};
