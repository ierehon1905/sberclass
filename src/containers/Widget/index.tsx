import React, { ReactElement, ReactNode, useEffect, useState } from "react";
import { useForm, NestedValue } from "react-hook-form";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { taskGroupSlice } from "../../store";
import EditorJS, {
  API as EditorAPI,
  BlockTool,
  BlockToolConstructable,
  BlockToolConstructorOptions,
  ConversionConfig,
  PasteConfig,
  SanitizerConfig,
} from "@editorjs/editorjs";
import Header from "@editorjs/header";
import SimpleImage from "@editorjs/simple-image";
import Quote from "@editorjs/quote";
import List from "@editorjs/list";
import Warning from "@editorjs/warning";
import Table from "@editorjs/table";
import RawTool from "@editorjs/raw";

// @ts-ignore
class SimpleQuestion implements BlockToolConstructable {
  data: any;
  static get toolbox() {
    return {
      title: "Question",
      icon: "?",
    };
  }
  constructor(config: BlockToolConstructorOptions) {
    this.data = config.data;
  }

  toolbox?: { icon: string; title?: string };
  pasteConfig?: false | PasteConfig;
  conversionConfig?: ConversionConfig;
  isReadOnlySupported?: boolean;
  isInline?: boolean;
  sanitize?: SanitizerConfig;
  title?: string;
  prepare?(data: { toolName: string; config: any }): void | Promise<void> {
    throw new Error("Method not implemented.");
  }
  reset?(): void | Promise<void> {
    throw new Error("Method not implemented.");
  }

  render() {


    const wrapper = document.createElement("div");
    wrapper.id = 'simple-question'
    // const input = document.createElement("input");

    // wrapper.classList.add("simple-image");
    // wrapper.appendChild(input);

    // input.placeholder = "Paste an image URL...";
    // input.value = this.data && this.data.url ? this.data.url : "";

    return wrapper;
  }
  save(blockContent) {
    const input = blockContent.querySelector("input");

    return {
      url: input.value,
    };
  }

  validate(savedData) {
    if (!savedData.url.trim()) {
      return false;
    }

    return true;
  }
}

class CommentTool {
  _state: any;
  button: null | HTMLButtonElement;
  api: EditorAPI;
  tag: string;
  class: string;
  static get isInline() {
    return true;
  }

  get state() {
    return this._state;
  }

  set state(state) {
    this._state = state;
    // console.log({ state });

    this.button.classList.toggle(this.api.styles.inlineToolButtonActive, state);
  }

  constructor({ api }: { api: EditorAPI }) {
    this.api = api;
    this.button = null;
    this._state = false;

    this.tag = "MARK";
    this.class = "cdx-marker";
    // console.log("Creating new comment instance", api);
  }

  render() {
    this.button = document.createElement("button");
    this.button.type = "button";
    this.button.innerHTML =
      '<svg width="20" height="18"><path d="M10.458 12.04l2.919 1.686-.781 1.417-.984-.03-.974 1.687H8.674l1.49-2.583-.508-.775.802-1.401zm.546-.952l3.624-6.327a1.597 1.597 0 0 1 2.182-.59 1.632 1.632 0 0 1 .615 2.201l-3.519 6.391-2.902-1.675zm-7.73 3.467h3.465a1.123 1.123 0 1 1 0 2.247H3.273a1.123 1.123 0 1 1 0-2.247z"/></svg>';
    this.button.classList.add(this.api.styles.inlineToolButton);

    return this.button;
  }

  surround(range: Range) {
    if (this.state) {
      this.unwrap(range);
      return;
    }

    this.wrap(range);
  }

  wrap(range: Range) {
    const selectedText = range.extractContents();
    const mark = document.createElement(this.tag);

    mark.classList.add(this.class);
    mark.appendChild(selectedText);
    const markInput = document.createElement("input");

    markInput.onchange = e => {
      // @ts-ignore
      mark.setAttribute("data-comment", e.target.value);
    };
    mark.onmouseenter = e => {
      console.log("Mouse entered comment");
      mark.appendChild(markInput);
    };
    mark.onmouseleave = e => {
      console.log("Mouse left comment");
      mark.removeChild(markInput);
    };
    range.insertNode(mark);

    this.api.selection.expandToTag(mark);
  }

  unwrap(range: Range) {
    const mark = this.api.selection.findParentTag(this.tag, this.class);
    const text = range.extractContents();

    mark.remove();

    range.insertNode(text);
  }

  checkState() {
    const mark = this.api.selection.findParentTag(this.tag);

    this.state = !!mark;
  }

  static get sanitize() {
    return {
      mark: {
        class: "cdx-marker",
        "data-comment": true,
      },
    };
  }
}

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
  params?: {
    [key: string]: any;
  };
}

export interface ConfiguredWidget extends WidgetInfo, WidgetProps {}

export const StyledConfiguredWidget = styled.div`
  &:hover {
    background-color: ${p => p.theme.lightLightGray};
  }
  margin: 10px 0;
`;

class TestWithTextInput
  implements
    GenWidget<{
      text: string;
      answer: string;
    }> {
  editRender = props => {
    const dispatch = useDispatch();
    const { register, handleSubmit, watch, setValue, errors } = useForm<{
      text: string;
      answer: string;
    }>({
      defaultValues: { text: props.params?.text, answer: props.params?.answer },
    });

    const onSubmit = handleSubmit(data => {
      console.log({ data });

      dispatch(
        taskGroupSlice.actions.editWidget({
          inTaskGroupId: props.inTaskGroupId,
          params: data,
        })
      );
    });

    return (
      <StyledConfiguredWidget>
        Edit Text input test
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="text"
            ref={register({
              required: true,
            })}
          />
          {errors.text?.message}

          <input
            type="text"
            name="answer"
            ref={register({
              required: true,
            })}
          />
          {errors.answer?.message}
          <button type="submit">Сохранить</button>
        </form>
      </StyledConfiguredWidget>
    );
  };
  previewRender = (props: WidgetProps) => (
    <StyledConfiguredWidget>
      Preview Text input test
      <div>{props.params?.text}</div>
      <div>{props.params?.answer}</div>
    </StyledConfiguredWidget>
  );

  widgetGuid: string = "1";
  title: string = "С полем ввода";
}
class TestWithOptions
  implements GenWidget<{ text: string; options: string[] }> {
  editRender: (props: WidgetProps) => JSX.Element = props => {
    const dispatch = useDispatch();
    const {
      register,
      handleSubmit,
      watch,
      setValue,
      errors,
      unregister,
    } = useForm<{
      text: string;
      // TODO валидацию
      options: string[];
      // multi: boolean;
    }>({
      defaultValues: {
        text: props.params?.text,
        options: props.params?.options || [],
        // multi: !!props.params?.multi,
      },
    });

    const onAddOption = () => {
      dispatch(
        taskGroupSlice.actions.editWidget({
          inTaskGroupId: props.inTaskGroupId,
          params: {
            ...(props.params || {}),
            options: (props.params?.options || []).concat(
              "New Option " + (props.params?.options.length + 1 || 1)
            ),
          },
        })
      );
    };

    const onRemoveOption = (order: number) => {
      dispatch(
        taskGroupSlice.actions.editWidget({
          inTaskGroupId: props.inTaskGroupId,
          params: {
            ...(props.params || {}),
            options: (props.params.options as string[]).filter(
              (_, i) => i !== order
            ),
          },
        })
      );
    };

    const onSubmit = handleSubmit(data => {
      console.log({ data });

      const optionKeys = Object.keys(data).filter(k => /^option\d+$/.test(k));

      const options = optionKeys.map(ok => data[ok]);
      const correct = optionKeys.map(ok => data[ok + "correct"]);

      const multi = correct.filter(Boolean).length > 1;

      optionKeys.forEach(ok => {
        delete data[ok];
        delete data[ok + "correct"];
      });

      dispatch(
        taskGroupSlice.actions.editWidget({
          inTaskGroupId: props.inTaskGroupId,
          params: { ...data, options, correct, multi },
        })
      );
    });

    return (
      <StyledConfiguredWidget>
        <form onSubmit={onSubmit}>
          <div>
            <input
              type="text"
              name="text"
              ref={register({
                required: true,
              })}
            />
          </div>
          <div>
            <ol>
              {((props.params?.options as string[]) || []).map((o, i) => (
                <li key={o}>
                  <input
                    type="text"
                    name={"option" + i}
                    defaultValue={o}
                    ref={register({
                      required: true,
                    })}
                  />
                  <label>
                    <input
                      type="checkbox"
                      name={"option" + i + "correct"}
                      ref={register({
                        required: false,
                      })}
                    />
                    is correct
                  </label>
                  <button type="button" onClick={() => onRemoveOption(i)}>
                    remove
                  </button>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <button type="button" onClick={onAddOption}>
              add
            </button>
          </div>
          {/* <div>
            <label>
              <input
                type="checkbox"
                name="multi"
                ref={register({ required: false })}
              />
              Multi
            </label>
          </div> */}
          <div>
            <button type="submit">save</button>
          </div>
        </form>
      </StyledConfiguredWidget>
    );
  };
  previewRender: (props: WidgetProps) => JSX.Element = props => {
    if (!props.params) return <div>Заполните поля и сохраните виджет</div>;
    return (
      <div>
        {props.params.text}
        <div>
          {props.params.options.map((o, i) => (
            <div>
              <label>
                <input
                  type={props.params.multi ? "checkbox" : "radio"}
                  name={"option" + i}
                />
                {o}
              </label>
            </div>
          ))}
        </div>
      </div>
    );
  };
  widgetGuid: string = "2";
  title: string = "С вариантами ответа";
}
class RichTextBox implements GenWidget {
  editRender = (props: WidgetProps) => {
    const dispatch = useDispatch();
    const [editor, setEditor] = useState<null | EditorJS>(null);
    useEffect(() => {
      setEditor(
        new EditorJS({
          holder: "editorjs" + props.inTaskGroupId,
          data: props.params as any,
          tools: {
            header: Header,
            image: SimpleImage,
            quote: Quote,
            warning: Warning,
            class: Table,
            raw: RawTool,
            simpleQuestion: SimpleQuestion,
            comment: CommentTool,
            list: {
              class: List,
              inlineToolbar: true,
            },
          },
        })
      );
    }, []);
    return (
      <StyledConfiguredWidget>
        {"editorjs" + props.inTaskGroupId}
        <div id={"editorjs" + props.inTaskGroupId}></div>
        <button
          onClick={() => {
            editor.save().then(res => {
              dispatch(
                taskGroupSlice.actions.editWidget({
                  inTaskGroupId: props.inTaskGroupId,
                  params: res,
                })
              );
            });
          }}
        >
          Save
        </button>
      </StyledConfiguredWidget>
    );
  };

  previewRender = (props: WidgetProps) => (
    <StyledConfiguredWidget>preview RichTextBox</StyledConfiguredWidget>
  );

  widgetGuid: string = "3";
  title: string = "Рич текст";
}

export const widgetMap: { [widgetGuid: string]: GenWidget } = {
  "1": new TestWithTextInput(),
  "2": new TestWithOptions(),
  "3": new RichTextBox(),
};
