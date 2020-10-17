import React from 'react';

export type Props = {
    context: any,
    taskState: any,
    setTaskState: (data: any) => void,
    setReleaseContext: (data: any) => void,
}

export const View = (props: Props) => {
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
