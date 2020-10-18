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
  const current = currentRevision ? currentRevision.revisionId : module._id;

  const onChange = e => {
    const revisionId = e.target.value;

    if (revisionId === module._id) {
      setCurrentRevision(null);
    }

    setCurrentRevision(revisions.find(rev => rev.revisionId === revisionId));
  };

  return (
    <label htmlFor="revision">
      Ревизия
      <StyledSelect value={current} onChange={onChange} name="revision" id="">
        <option key={module._id} value={module._id}>
          Последняя версия
        </option>
        {revisions.map(rev => (
          <option key={rev.revisionId} value={rev.revisionId}>{`${moment(
            rev.revisionVersion
          ).format("DD-MM-YYYY hh:mm:ss")} | ${rev.revision}`}</option>
        ))}
      </StyledSelect>
    </label>
  );
};
