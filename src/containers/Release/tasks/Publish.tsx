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
    view: View,
    triggerStart: null,
    triggerEnd: null,
    triggerError: null,
}
