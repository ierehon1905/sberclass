import React from 'react';
import { PipelineViewProps } from './TextReview';



export const View = (props: PipelineViewProps) => {
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
