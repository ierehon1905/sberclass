import React from 'react';
import { taskStatuses } from '.';

export type Props = {
    context: any,
    taskState: any,
    setTaskState: (data: any) => void,
    setReleaseContext: (data: any) => void,
}

export const View = () => {
    return (
        <div style={{ background: 'green' }}>
            {/* sasai */}
        </div>
    )
}


export default {
    cardView: null,
    view: View,
    triggerStart: ({ setTaskState, task }) => {
        setTaskState(task.type, { status: taskStatuses.COMPLETED })
    },
    triggerEnd: null,
    triggerError: null,
}
