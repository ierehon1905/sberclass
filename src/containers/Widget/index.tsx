import styled from "styled-components";
import { CmsBlockTypes } from "../../entities/cms";
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
  &:hover {
    background-color: ${p => p.theme.white};
  }

  input {
    border-radius: 8px;
    border: 1.5px solid #444;
    outline: none;
    background-color: white;
    min-height: 32px;
    padding-left: 10px;
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
