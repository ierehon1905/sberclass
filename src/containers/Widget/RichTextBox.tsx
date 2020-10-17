import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Quote from "@editorjs/quote";
import RawTool from "@editorjs/raw";
import SimpleImage from "@editorjs/simple-image";
import Table from "@editorjs/table";
import Warning from "@editorjs/warning";
import React, { useEffect, useState } from "react";
import { CmsBlockTypes } from "../../entities/cms";
import { CommentTool } from "./CommentTool";
import { GenWidget, StyledConfiguredWidget, WidgetProps } from "./index";
import { SimpleQuestion } from "./SimpleQuestion";

export class RichTextBox implements GenWidget {
  editRender = (props: WidgetProps) => {
    const [editor, setEditor] = useState<null | EditorJS>(null);
    const canEdit =
      props.phase === "edit" ||
      (props.phase === "partial-edit" &&
        props.editableIds?.includes(props._id));

    useEffect(() => {
      setEditor(
        new EditorJS({
          holder: "editorjs" + props._id,
          data: props.data as any,
          readOnly: !canEdit,
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
        {"editorjs" + props._id}
        <div id={"editorjs" + props._id}></div>
        <button
          disabled={!canEdit}
          onClick={() => {
            editor.save().then(res => {
              console.log("Saving the whole editor");
              console.log(res);

              props.onChange(res);
            });
          }}
        >
          Сохранить виджет
        </button>
        <button
          type="button"
          disabled={!canEdit}
          onClick={() => {
            // editor.destroy();
            props.onDelete();
          }}
        >
          Удалить виджет
        </button>
      </StyledConfiguredWidget>
    );
  };

  previewRender = (props: WidgetProps) => (
    <StyledConfiguredWidget>preview RichTextBox</StyledConfiguredWidget>
  );

  type: CmsBlockTypes = CmsBlockTypes.richContent;

  title: string = "Рич текст";
}
