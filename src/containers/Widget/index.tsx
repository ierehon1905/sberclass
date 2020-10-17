import styled from "styled-components";
import { CmsBlockTypes } from "../../entities/cms";
import { colors } from "../../utils/theme";
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

export interface WidgetProps {
  id: string;
  onChange?: (params: any) => void;
  onDelete?: () => void;
  data?: {
    [key: string]: any;
  };
}

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
    background-color: ${p => p.theme.white};
    .show-on-hover {
      opacity: 1;
      pointer-events: all;
    }
  }

  input {
    outline: none;
    display: inline-block;

    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 20px;

    width: 50%;
    height: 62px;
    left: 0px;
    top: 0px;

    background: #ffffff;

    border: 1.5px solid ${colors.gray2};
    box-sizing: border-box;
    border-radius: 18px;
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
