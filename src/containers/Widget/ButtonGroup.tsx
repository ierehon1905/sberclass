import React from "react";
import styled from "styled-components";
import Icon from "../../components/Icon";
import { colors } from "../../utils/theme";

const Wrapper = styled.div<{ top?: number }>`
  position: absolute;
  left: 20px;
  margin-top: ${({ top }) => (top >= 0 ? top : 16)}px;
  width: 32px;
  height: auto;
  button {
    transform: scale(1.1);
    width: 24px;
    height: 24px;
    outline: none;
    border-radius: 6px;
    padding: 4px;
    margin-bottom: 8px;
    background: transparent;
    border: 0;
    transition: 0.3s;
    & > div {
      transition: 0.3s;
      background-color: ${colors.gray2};
    }
    &:hover {
      & > div {
        background-color: ${colors.blue};
      }
      &.delete > div {
        background-color: ${colors.red};
      }
      background: ${colors.light2};
    }
  }
`;

export default function ButtonGroup({
  canEdit,
  onDelete,
  onSave,
  top,
}: {
  canEdit: boolean;
  onDelete?: () => void;
  onSave?: () => void;
  top?: number;
}) {
  if (!canEdit) return null;
  return (
    <Wrapper top={top} className="button-group show-on-hover">
      <button type="submit" onClick={onSave} disabled={!canEdit}>
        <Icon glyph="save" size={16} />
      </button>
      <button
        className="delete"
        type="button"
        onClick={onDelete}
        disabled={!canEdit}
      >
        <Icon glyph="remove" size={16} />
      </button>
    </Wrapper>
  );
}
