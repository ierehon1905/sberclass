import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { taskGroupSlice } from "../../store";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import SimpleImage from "@editorjs/simple-image";
import Quote from "@editorjs/quote";
import List from "@editorjs/list";
import Warning from "@editorjs/warning";
import Table from "@editorjs/table";
import RawTool from "@editorjs/raw";
import { GenWidget, WidgetProps, StyledConfiguredWidget } from "./index";
import { SimpleQuestion } from "./SimpleQuestion";
import { CommentTool } from "./CommentTool";

export class RichTextBox implements GenWidget {
  editRender = props => {
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
              console.log("Saving the whole editor");
              console.log(res);

              props.onChange(res);
            });
          }}
        >
          Save
        </button>
        <button type="button" onClick={props.onDelete}>
          delete
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
