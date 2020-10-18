import React from "react";
import { useForm } from "react-hook-form";
import { CmsBlockTypes } from "../../entities/cms";
import ButtonGroup from "./ButtonGroup";
import { GenWidget, StyledConfiguredWidget, WidgetProps } from "./index";
import tumbnail03 from "../../components/images/tumbnail03.png";

export class TestWithTextInput
  implements
    GenWidget<{
      text: string;
      answer: string;
    }> {
  type: CmsBlockTypes = CmsBlockTypes.textQuestion;
  editRender = (props: WidgetProps) => {
    const { register, handleSubmit, watch, setValue, errors } = useForm<{
      text: string;
      answer: string;
    }>({
      defaultValues: { text: props.data?.text, answer: props.data?.answer },
    });

    const onSubmit = handleSubmit(data => {
      // props.onChange(data);
      props.onChange?.call(null, data);
    });

    const canEdit =
      props.phase === "edit" ||
      (props.phase === "partial-edit" &&
        props.editableIds?.includes(props._id));

    return (
      <StyledConfiguredWidget>
        <form onSubmit={onSubmit}>
          <ButtonGroup canEdit={canEdit} onDelete={props.onDelete} />
          <div>
            <input
              type="text"
              name="text"
              className="input-title"
              placeholder="Заголовок вопроса"
              autoComplete="off"
              autoFocus
              readOnly={!canEdit}
              ref={register({
                required: true,
              })}
            />
            {errors.text?.message}
          </div>
          <div>
            <input
              type="text"
              name="answer"
              placeholder="Правильный ответ"
              className="input"
              readOnly={!canEdit}
              autoComplete="off"
              ref={register({
                required: true,
              })}
            />
            {errors.answer?.message}
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
  preview: string = tumbnail03;

  title: string = "С полем ввода";
}
