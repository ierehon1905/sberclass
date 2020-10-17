import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { CmsBlockTypes } from "../../entities/cms";
import { taskGroupSlice } from "../../store";
import { GenWidget, StyledConfiguredWidget, WidgetProps } from "./index";

export class TestWithTextInput
  implements
    GenWidget<{
      text: string;
      answer: string;
    }> {
  type: CmsBlockTypes = CmsBlockTypes.textQuestion;
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
        {this.title}
        <form onSubmit={onSubmit}>
          <div>
            <input
              type="text"
              name="text"
              ref={register({
                required: true,
              })}
              placeholder="Вопрос"
            />
            {errors.text?.message}
          </div>
          <div>
            <input
              type="text"
              name="answer"
              placeholder="Ответ"
              ref={register({
                required: true,
              })}
            />
            {errors.answer?.message}
          </div>
          <div>
            <button type="submit">Сохранить виджет</button>
            <button type="button" onClick={props.onDelete}>
              Удалить виджет
            </button>
          </div>
        </form>
      </StyledConfiguredWidget>
    );
  };
  previewRender = (props: WidgetProps) => (
    <StyledConfiguredWidget>
      Preview Text input test
      <div>{props.data?.text}</div>
      <div>{props.data?.answer}</div>
    </StyledConfiguredWidget>
  );

  title: string = "С полем ввода";
}
