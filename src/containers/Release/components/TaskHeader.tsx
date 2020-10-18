import React from 'react';
import moment from 'moment';
import { RevisionSelector } from './RevisionSelector';
import { TaskControls } from './TaskControls';
import styled from "styled-components";


const StyledWrap = styled.div`
    padding: 12px;
    flex-direction: row;
    align-items: center;
`

const StyledHeading = styled.div`
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 12px;
`

const StyledDate = styled.div`
    font-size: 28px;
    alignItems: center;
`

export const TaskHeader = (props: any) => {
    const { task } = props;
    const { state } = task;

    return (
        <StyledWrap>
            <StyledHeading>Задача {task.type}</StyledHeading>
            {state.startedAt &&
                <StyledDate>Время начала: {moment(state.startedAt).format('DD-MM-YYYY hh:mm:ss')}</StyledDate>
            }

            {state.finishedAt &&
                <StyledDate>Время окончания: {moment(state.finishedAt).format('DD-MM-YYYY hh:mm:ss')}</StyledDate>
            }

            <RevisionSelector {...props} />
            <TaskControls {...props} />
        </StyledWrap>
    )
}