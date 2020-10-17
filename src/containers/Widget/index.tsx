import styled from "styled-components";
import { RichTextBox } from "./RichTextBox";
import { TestWithOptions } from "./TestWithOptions";
import { TestWithTextInput } from "./TestWithTextInput";

export interface WidgetInfo {
  readonly widgetGuid: string; // === type
  readonly title: string;
}

export interface GenWidget<T extends {} = {}> extends WidgetInfo {
  editRender: (props: WidgetProps & T) => JSX.Element;
  previewRender: (props: WidgetProps & T) => JSX.Element;
}

export interface WidgetProps {
  inTaskGroupId: string;
  onChange?: (params: any) => void;
  onDelete?: () => void;
  params?: {
    [key: string]: any;
  };
}

export interface ConfiguredWidget
  extends WidgetInfo,
    Omit<WidgetProps, "onChange"> {}

export const StyledConfiguredWidget = styled.div`
  background-color: transparent;
  &:hover {
    background-color: ${p => p.theme.white};
  }
  margin: 10px 0;
`;

export const widgetMap: { [widgetGuid: string]: GenWidget } = {
  "1": new TestWithTextInput(),
  "2": new TestWithOptions(),
  "3": new RichTextBox(),
};
