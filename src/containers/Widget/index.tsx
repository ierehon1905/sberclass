import styled, { css } from "styled-components";
import { CmsBlockTypes } from "../../entities/cms";
import { colors } from "../../utils/theme";
import { WithPhase } from "../EditTaskGroup";
import { RichTextBox } from "./RichTextBox";
import { TestWithOptions } from "./TestWithOptions";
import { TestWithTextInput } from "./TestWithTextInput";

export interface WidgetInfo {
  type: CmsBlockTypes; // === type
  title: string;
}

export interface GenWidget<T extends {} = {}> extends WidgetInfo {
  editRender: (props: WidgetProps & T) => JSX.Element;
  previewRender: (props: WidgetProps & T) => JSX.Element;
}

export interface WidgetProps extends WithPhase {
  _id: string;
  onChange?: (params: any) => void;
  onDelete?: () => void;
  data?: {
    [key: string]: any;
  };
}
export const inputBaseStyles = css`
  outline: none;
  display: inline-block;
  padding: 8px;
  margin-bottom: 10px;

  display: flex;
  justify-content: space-between;

  background: #ffffff;

  border: 1.5px solid ${colors.gray2};
  box-sizing: border-box;
  border-radius: 18px;

  transition: 0.3s ease;

  &:hover {
    border: 1.5px solid ${colors.gray4};
  }

  & > input[type="text"]:not(.input) {
    width: 100%;
    border: 0;
    outline: none;
    margin-top: 4px;
  }
`;
export interface ConfiguredWidget
  extends WidgetInfo,
    Omit<WidgetProps, "onChange" | "onDelete"> {}

export const StyledConfiguredWidget = styled.div`
  background-color: transparent;
  .show-on-hover {
    opacity: 0;
    pointer-events: none;
  }
  &:hover {
    /* background-color: ${p => p.theme.white}; */
    .show-on-hover {
      opacity: 1;
      pointer-events: all;
    }
  }

  .input-title {
    border-radius: 0;
    border: 0;
    background: transparent;
    outline: none;
    padding: 4px 0;
    font-weight: bold;
    font-size: 20px;
    line-height: 130%;
    width: 100%;
  }

  .input-half {
    ${inputBaseStyles}
    display: inline-flex;
    margin-right: 10px;
    width: calc(50% - 10px);
    height: 62px;
  }

  .input {
    ${inputBaseStyles}
    width: 100%;
    height: 62px;
  }

  .inner-action {
    min-width: 46px;
    height: 46px;
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 12px;
    border: 0;
    background: transparent;
    transition: 0.3s ease;
    outline: none;
    & > input[type="checkbox"] {
      margin: 0;
    }
    &.button {
      &:hover {
        background-color: ${colors.light2};
      }
    }
    &.right {
      margin-left: -10px;
    }
    &.left {
      margin-right: -10px;
    }
  }
  .pointer {
    cursor: pointer;
  }

  margin: 10px 0;
`;

export const widgetMap: { [widgetGuid in CmsBlockTypes]: GenWidget } = {
  textQuestion: new TestWithTextInput(),
  testSingle: new TestWithOptions(),
  testMultiple: new TestWithOptions(),
  testMultipleCombination: new TestWithOptions(),
  richContent: new RichTextBox(),
};
