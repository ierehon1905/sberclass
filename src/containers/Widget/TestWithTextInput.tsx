import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { taskGroupSlice } from "../../store";
import { GenWidget, StyledConfiguredWidget, WidgetProps } from "./index";

export class TestWithTextInput
  implements
    GenWidget<{
      text: string;
      answer: string;
    }> {
  editRender = props => {
    // const dispatch = useDispatch();
    const { register, handleSubmit, watch, setValue, errors } = useForm<{
      text: string;
      answer: string;
    }>({
      defaultValues: { text: props.params?.text, answer: props.params?.answer },
    });

    const onSubmit = handleSubmit(data => {
      props.onChange(data);
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
          <button type="button" onClick={props.onDelete}>
            delete
          </button>
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
