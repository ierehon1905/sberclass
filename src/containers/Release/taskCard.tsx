import moment from "moment";
import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import styled, { keyframes } from "styled-components";
import Icon from "../../components/Icon";
import { taskTypeToRussian } from "../../utils/interpreter";
import { colors } from "../../utils/theme";
import { StyledDate } from "./components/TaskHeader";
import { taskStatuses } from "./tasks";

const getTaskColor = status => {
    switch (status) {
        case taskStatuses.PENDING:
            return colors.blue;

        case taskStatuses.COMPLETED:
            return colors.green;

        case taskStatuses.ERROR:
            return colors.red;

        case taskStatuses.ATTENTION:
            return colors.orange;

        default:
            return colors.gray4;
    }
};

const getTaskSubColor = status => {
    switch (status) {
        case taskStatuses.PENDING:
            return colors.lightBlue;

        case taskStatuses.COMPLETED:
            return colors.lightGreen;

        case taskStatuses.ERROR:
            return colors.lightRed;

        case taskStatuses.ATTENTION:
            return colors.lightOrange;

        default:
            return colors.gray2;
    }
};

const StyledCard = styled.div<{ status: taskStatuses }>`
  min-width: 180px;
  min-height: 100px;
  margin-top: 100px;
  margin-bottom: 100px;
  background-color: white;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 14px;
  padding: 12px 20px;
  border: 2px solid ${({ status }) => getTaskColor(status)};
  transition: 0.3s ease;
`;

const Status = styled.div<{ state: taskStatuses }>`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 8px 12px;
  margin-top: 8px;

  background: ${({ state }) => getTaskSubColor(state)};
  border-radius: 8px;
  span {
    color: ${({ state }) => getTaskColor(state)};
    line-height: 17px;
  }
`;

export const rotate = keyframes`
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const StatusIcon = styled(Icon).attrs(() => ({
    size: 16,
    isColored: true,
}))`
  margin-right: 6px;
  &.rotate {
    animation: ${rotate} 1s linear infinite;
  }
`;

export const TaskCard = (props) => {
    const {
        shouldStart,
        task,
        tasksMap,
        context,
        setTaskState,
        setReleaseContext,
        setSelectedTask,
    } = props;

    const { type } = task;
    const { isManual } = task.props;
    const { status, error, startedAt, finishedAt } = task.state;
    const config = tasksMap[type];

    useEffect(() => {
        if (shouldStart && !isManual && (task.state.status !== taskStatuses.COMPLETED && task.state.status !== taskStatuses.ERROR)) {
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

        if (status === taskStatuses.COMPLETED && !task.state.finishedAt) {
            setTaskState(type, { finishedAt: Date.now() });

            if (config.triggerEnd) {
                config.triggerEnd(triggerParams);
            }

            props.createRevision(`${task.type} ${status.toLowerCase()}`)
        }

        if (status === taskStatuses.ERROR) {
            if (config.triggerError) {
                config.triggerError(triggerParams);
            }
        }
    }, [status]);

    const CardView = config.cardView ? config.cardView : () => null;

    return (
        <StyledCard
            status={status}
            onClick={() => setSelectedTask(task)}
            className="task-card"
        >
            <h3>{taskTypeToRussian(type)}</h3>
            {startedAt && (
                <StyledDate>
                    <Icon glyph="start" size={16} />
                    {moment(startedAt).format("DD-MM-YYYY hh:mm:ss")}
                </StyledDate>
            )}

            {finishedAt && (
                <StyledDate>
                    <Icon glyph="end" size={16} />
                    {moment(finishedAt).format("DD-MM-YYYY hh:mm:ss")}
                </StyledDate>
            )}
            {status && (
                <Status state={status}>
                    <StatusIcon
                        glyph={status}
                        className={status == "PENDING" ? "rotate" : ""}
                    />
                    <span>{status}</span>
                </Status>
            )}
            <CardView {...props} />
        </StyledCard>
    );
};
