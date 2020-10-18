import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { taskStatuses } from "./tasks";

const getTaskColor = status => {
  switch (status) {
    case taskStatuses.PENDING:
      return "orange";

    case taskStatuses.COMPLETED:
      return "green";

    case taskStatuses.ERROR:
      return "red";

    default:
      return "grey";
  }
};

const StyledCard = styled.div<{ status: taskStatuses }>`
  width: 150px;
  height: 150px;
  margin-top: 100px;
  margin-bottom: 100px;
  background-color: white;
  padding: 12px;
  border: 1px solid ${({ status }) => getTaskColor(status)};
`;

export const TaskCard = ({
  shouldStart,
  task,
  tasksMap,
  context,
  setTaskState,
  setReleaseContext,
  setSelectedTask,
}) => {
  const { type } = task;
  const { status, error } = task.state;
  const config = tasksMap[type];

  useEffect(() => {
    if (shouldStart) {
      setTaskState(type, { status: taskStatuses.PENDING });
    }
  }, [shouldStart]);

  useEffect(() => {
    const triggerParams = {
      task,
      tasksMap,
      context,
      setTaskState,
      setReleaseContext,
      setSelectedTask,
    };

    if (status === taskStatuses.PENDING) {
      setTaskState(type, { startedAt: Date.now() });

      if (config.triggerStart) {
        config.triggerStart(triggerParams);
      }
    }

    if (status === taskStatuses.COMPLETED) {
      setTaskState(type, { finishedAt: Date.now() });

      if (config.triggerEnd) {
        config.triggerEnd(triggerParams);
      }
    }

    if (status === taskStatuses.ERROR) {
      if (config.triggerError) {
        config.triggerError(triggerParams);
      }
    }
  }, [status]);

  return (
    <StyledCard
      status={status}
      onClick={() => setSelectedTask(task)}
      className="task-card"
    >
      <div>{type}</div>
      <div>{status}</div>
    </StyledCard>
  );
};
