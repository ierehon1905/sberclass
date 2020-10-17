import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { batch, useDispatch } from "react-redux";
import { taskGroupSlice } from "../../store";
import { GenWidget, WidgetProps, StyledConfiguredWidget } from "./index";

export class TestWithOptions
  implements GenWidget<{ text: string; options: string[] }> {
  editRender = props => {
    // const dispatch = useDispatch();
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
    }>({
      defaultValues: {
        text: props.params?.text,
        options: props.params?.options || [],
      },
    });

    const onAddOption = () => {
      props.onChange({
        ...(props.params || {}),
        options: (props.params?.options || []).concat(
          "New Option " + (props.params?.options.length + 1 || 1)
        ),
      });
    };
    useEffect(() => {
      if (!props.params?.options) {
        props.onChange({
          ...(props.params || {}),
          options: ["New Option 1", "New Option 2"],
        });
      }
    }, []);

    const onRemoveOption = (order: number) => {
      props.onChange({
        ...(props.params || {}),
        options: (props.params.options as string[]).filter(
          (_, i) => i !== order
        ),
      });
    };

    const onSubmit = handleSubmit(data => {
      console.log({ data });

      const optionKeys = Object.keys(data).filter(k => /^option\d+$/.test(k));

      const options = optionKeys.map(ok => data[ok]);
      const correct = optionKeys
        .map(ok => (data[ok + "correct"] ? data[ok] : false))
        .filter(Boolean);

      const multi = correct.filter(Boolean).length > 1;

      optionKeys.forEach(ok => {
        delete data[ok];
        delete data[ok + "correct"];
      });

      props.onChange({ ...data, options, correct, multi });
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
            />
          </div>
          <div>
            <ol>
              {((props.params?.options as string[]) || []).map((o, i) => (
                <li key={o}>
                  <input
                    type="text"
                    name={"option" + i}
                    key={o}
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
                    Правильный
                  </label>
                  <button type="button" onClick={() => onRemoveOption(i)}>
                    Удалить
                  </button>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <button type="button" onClick={onAddOption}>
              Добавить вариант ответа
            </button>
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
