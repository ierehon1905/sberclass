import React, { useState } from "react";
import moment from "moment";
import styled from "styled-components";
import { InputStyles } from "../../../components/SideBarItem/Widgets/ShortInput";
import { colors } from "../../../utils/theme";

const StyledSelect = styled.select`
  ${InputStyles}
  font-size: 14px;
  padding: 10px;
  border-radius: 12px;
  margin-left: 10px;
  width: 190px;
  background: ${colors.white};
  margin-bottom: 8px;
`;

export const RevisionSelector = ({
    revisions,
    currentRevision,
    setCurrentRevision,
    module = { _id: 0 },
}) => {
    const current = currentRevision ? currentRevision.revisionVersion : module._id;

    const onChange = e => {
        const revisionVersion = e.target.value;

        if (revisionVersion === module._id) {
            setCurrentRevision(null);
        }

        const newRev = revisions.find(rev => rev.revisionVersion == revisionVersion);

        console.log('revisionId', revisionVersion, newRev);

        setCurrentRevision(newRev);
    };



    return (
        <label htmlFor="revision">
            Ревизия
            <StyledSelect value={current} onChange={onChange} name="revision" id="">
                <option key={module._id + 'kek'} value={module._id}>
                    Последняя версия
                </option>
                {revisions.sort((a, b) => Number(b.revisionVersion) - Number(a.revisionVersion)).map(rev => (
                    <option key={rev.revisionVersion} value={rev.revisionVersion}>
                        {`${moment(rev.revisionVersion).format("DD-MM-YYYY hh:mm:ss")} | ${rev.revision}`}
                    </option>
                ))}
            </StyledSelect>
        </label>
    );
};
