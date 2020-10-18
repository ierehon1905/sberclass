import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { batch, useDispatch } from "react-redux";
import Icon from "../../components/Icon";
import { CmsBlockTypes } from "../../entities/cms";
import { taskGroupSlice } from "../../store";
import { colors } from "../../utils/theme";
import ButtonGroup from "./ButtonGroup";
import { GenWidget, WidgetProps, StyledConfiguredWidget } from "./index";
import tumbnail04 from "../../components/images/tumbnail04.png";

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
          ""
          // "New Option " + (props.data?.options.length + 1 || 1)
        ),
      });
    };
    useEffect(() => {
      if (!props.data?.options) {
        props.onChange({
          ...(props.data || {}),
          options: ["", ""],
          // options: ["New Option 1", "New Option 2"],
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
        <form onSubmit={onSubmit}>
          <ButtonGroup canEdit={canEdit} onDelete={props.onDelete} />
          <div>
            <input
              type="text"
              name="text"
              autoComplete="off"
              className="input-title"
              placeholder="Заголовок вопроса"
              autoFocus
              readOnly={!canEdit}
              ref={register({
                required: true,
              })}
            />
          </div>
          <div>
            {((props.data?.options as string[]) || []).map((o, i) => (
              <div key={o + i} className="input-half">
                <div className="inner-action left">
                  <input
                    type="checkbox"
                    className="pointer"
                    name={"option" + i + "correct"}
                    defaultChecked={props.data?.correct?.includes(o)}
                    readOnly={!canEdit}
                    disabled={!canEdit}
                    ref={register({
                      required: false,
                    })}
                  />
                </div>
                <input
                  type="text"
                  autoComplete="off"
                  name={"option" + i}
                  key={"input" + o + i}
                  defaultValue={o}
                  placeholder={"Введи вариант"}
                  readOnly={!canEdit}
                  disabled={!canEdit}
                  ref={register({
                    required: true,
                  })}
                />
                {canEdit && (
                  <button
                    className="inner-action button right"
                    type="button"
                    onClick={() => onRemoveOption(i)}
                  >
                    <Icon size={16} glyph="remove" color={colors.red} />
                  </button>
                )}
              </div>
            ))}
            {canEdit && (
              <button
                className="new-item input-half"
                type="button"
                onClick={onAddOption}
                disabled={!canEdit}
              >
                Добавить вариант ответа
              </button>
            )}
          </div>
          {/* <div>
            <button type="submit" disabled={!canEdit}>
              Сохранить виджет
            </button>
            <button type="button" onClick={props.onDelete} disabled={!canEdit}>
              Удалить виджет
            </button>
          </div> */}
        </form>
      </StyledConfiguredWidget>
    );
  };
  previewRender: (props: WidgetProps) => JSX.Element = props => {
    if (!props.data) return <div>Заполните поля и сохраните виджет</div>;
    return (
      <div>
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
  preview: string = tumbnail04;

  title: string = "С вариантами ответа";
}
