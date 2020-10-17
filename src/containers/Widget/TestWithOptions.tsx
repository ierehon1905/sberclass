import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { CmsBlockTypes } from "../../entities/cms";
import { GenWidget, StyledConfiguredWidget, WidgetProps } from "./index";

export class TestWithOptions
  implements GenWidget<{ text: string; options: string[] }> {
  editRender = (props: WidgetProps) => {
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
        text: props.data?.text,
        options: props.data?.options || [],
      },
    });

    const onAddOption = () => {
      props.onChange({
        ...(props.data || {}),
        options: (props.data?.options || []).concat(
          "New Option " + (props.data?.options.length + 1 || 1)
        ),
      });
    };
    useEffect(() => {
      if (!props.data?.options) {
        props.onChange({
          ...(props.data || {}),
          options: ["New Option 1", "New Option 2"],
        });
      }
    }, []);

    const onRemoveOption = (order: number) => {
      props.onChange({
        ...(props.data || {}),
        options: (props.data.options as string[]).filter((_, i) => i !== order),
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

    const canEdit =
      props.phase === "edit" ||
      (props.phase === "partial-edit" &&
        props.editableIds?.includes(props._id));

    return (
      <StyledConfiguredWidget>
        {this.title}
        <form onSubmit={onSubmit}>
          <div>
            <input
              type="text"
              className="input-title"
              name="text"
              readOnly={!canEdit}
              ref={register({
                required: true,
              })}
            />
          </div>
          <div>
            {((props.data?.options as string[]) || []).map((o, i) => (
              <div key={o + i} className="input">
                <input
                  type="text"
                  name={"option" + i}
                  key={"input" + o + i}
                  defaultValue={o}
                  readOnly={!canEdit}
                  ref={register({
                    required: true,
                  })}
                />
                <label>
                  <input
                    type="checkbox"
                    name={"option" + i + "correct"}
                    defaultChecked={props.data?.correct?.includes(o)}
                    disabled={!canEdit}
                    ref={register({
                      required: false,
                    })}
                  />
                  Правильный
                </label>
                <button
                  type="button"
                  onClick={() => onRemoveOption(i)}
                  disabled={!canEdit}
                >
                  Удалить
                </button>
              </div>
            ))}
          </div>
          <div>
            <button type="button" onClick={onAddOption} disabled={!canEdit}>
              Добавить вариант ответа
            </button>
          </div>

          <div>
            <button type="submit" disabled={!canEdit}>
              Сохранить виджет
            </button>
            <button type="button" onClick={props.onDelete} disabled={!canEdit}>
              Удалить виджет
            </button>
          </div>
        </form>
      </StyledConfiguredWidget>
    );
  };
  previewRender: (props: WidgetProps) => JSX.Element = props => {
    if (!props.data) return <div>Заполните поля и сохраните виджет</div>;
    return (
      <div>
        {props.data.text}
        <div>
          {props.data.options.map((o, i) => (
            <div>
              <label>
                <input
                  type={props.data.multi ? "checkbox" : "radio"}
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
  type: CmsBlockTypes = CmsBlockTypes.testSingle;

  title: string = "С вариантами ответа";
}
