import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Icon from "../../components/Icon";
import { shadows } from "../../utils/theme";
import { TaskHeader } from "./components/TaskHeader";

const TaskViewWrapper = styled.div`
  min-width: 600px;
  background: white;
  box-shadow: ${shadows.shadow3};
  position: fixed;
  right: 0;
  top: 60px;
  bottom: 0;
  overflow: scroll;
  z-index: 101;
  transition: 0.5s ease;
  transform: translateX(100%);
  &.isShown {
    transform: translateX(0px);
  }
`;

const StyledCollapse = styled(Icon).attrs(props => ({
  glyph: "collapse",
}))`
  transform: rotateY(180deg);
  cursor: pointer;
  position: absolute;
  left: 20px;
  top: 28px;
`;

export default function TaskViewComponent({ releaseApiProps, TaskView }) {
  const [isTaskViewOpened, setIsTaskViewOpened] = useState(false);
  useEffect(() => {
    if (TaskView) {
      setIsTaskViewOpened(true);
    }
  }, [TaskView]);
  return (
    <TaskViewWrapper className={isTaskViewOpened ? "isShown" : ""}>
      <StyledCollapse onClick={() => setIsTaskViewOpened(false)} />
      {TaskView && (
        <>
          <TaskHeader {...releaseApiProps} />
          <TaskView {...releaseApiProps} />
        </>
      )}
    </TaskViewWrapper>
  );
}
