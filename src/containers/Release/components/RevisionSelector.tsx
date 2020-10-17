import React, { useState } from 'react';
import moment from 'moment';

export const RevisionSelector = ({ revisions, currentRevision, setCurrentRevision, module = { _id: 0 } }) => {

    const current = currentRevision ? currentRevision.revisionId : module._id;

    const onChange = (e) => {
        const revisionId = e.target.value;

        if (revisionId === module._id) {
            setCurrentRevision(null)
        }

        setCurrentRevision(revisions.find(rev => rev.revisionId === revisionId));
    }

    return (
        <label htmlFor="revision">
            Ревизия
            <select value={current} onChange={onChange} name="revision" id="">
                <option key={module._id} value={module._id}>Последняя версия</option>
                {revisions.map(rev => (
                    <option key={rev.revisionId} value={rev.revisionId}>{`${moment(rev.revisionVersion).format('DD-MM-YYYY hh:mm:ss')} | ${rev.revision}`}</option>
                ))}
            </select>
        </label>
    )
}