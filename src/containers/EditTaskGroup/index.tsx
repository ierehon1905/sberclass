import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { SideBar } from "../../components/SideBar";
import { SideBarItem } from "../../components/SideBarItem";
import { ShadowClipWrapper } from "../../components/SideBarItem/ShadowClipWrapper";
import View from "../../components/View";
import { CmsBlockTypes, CmsDeclaration } from "../../entities/cms";
import { EducationModule, TaskGroup } from "../../entities/education";
import {
  resolveEducationModule,
  resolveUpdateTaskGroup,
} from "../../entities/education/resolvers";
import { moduleSlice, RootState } from "../../store";
import { widgetMap } from "../Widget";

const StyledEditTaskGroupArea = styled.div`
  flex-grow: 2;
  display: flex;
  flex-direction: column;
  .edit-area {
    display: flex;
    flex-grow: 2;
    background-color: ${p => p.theme.light};
    padding-top: 80px;
    height: 100vh;
  }
  .main-edit {
    background-color: ${p => p.theme.white};
    /* box-shadow: 0 0 10px 10px gray; */
    margin-left: 340px;
  }
  .side-bar {
    margin-left: 20px;
    width: 200px;
    .widget-item {
      cursor: pointer;
    }
  }
`;

export type WithPhase = {
  phase: "edit" | "partial-edit" | "comment" | "view";
  editableIds?: string[];
};

export const ControllableEditArea = (
  props: {
    state: TaskGroup;
    onEditWidget: (arg0: any) => any;
    onDeleteWidget: (arg0: any) => any;
  } & WithPhase
) => (
  <div>
    {props.state.content.blocks.map(w => {
      const El = widgetMap[w.type];
      const Jsx = El.editRender;
      return (
        <React.Fragment key={w._id}>
          <Jsx
            _id={w._id}
            data={w.data}
            phase={props.phase}
            onChange={props.onEditWidget(w._id)}
            onDelete={props.onDeleteWidget(w._id)}
          />
        </React.Fragment>
      );
    })}
  </div>
);

const Controllable = (props: {
  onAddWidget: (arg0: CmsBlockTypes) => any;
  state: TaskGroup;
  onEditWidget: (arg0: any) => any;
  onDeleteWidget: (arg0: any) => any;
}) => (
  <StyledEditTaskGroupArea>
    {/* <h2>Редактор группы заданий</h2> */}
    <div className="edit-area">
      <SideBar>
        <SideBarItem>
          <h2>Библиотека</h2>
        </SideBarItem>
        <ShadowClipWrapper>
          {Object.values(widgetMap).map((gw, i) => (
            <SideBarItem
              withShadow
              isClickable
              key={gw.type + i}
              onClick={() => props.onAddWidget(gw.type)}
            >
              {gw.preview && <img src={gw.preview} />}
              {gw.title}
            </SideBarItem>
          ))}
        </ShadowClipWrapper>
      </SideBar>
      <View>
        <ControllableEditArea
          phase="edit"
          state={props.state}
          onDeleteWidget={props.onDeleteWidget}
          onEditWidget={props.onEditWidget}
        />
      </View>
      {/* <SideBar isRight>
        <SideBarItem>
          <h2>Превью</h2>
        </SideBarItem>
        <SideBarItem type="button" data={{ title: "lol" }} />
        <SideBarItem type="textArea" data={{ title: "lol" }} />
        <SideBarItem type="select" data={{ title: "lol" }} />
        <ShadowClipWrapper>
          <SideBarItem>
            {props.state.content.blocks.map(w => {
              const El = widgetMap[w.type];
              const Jsx = El.previewRender;
              return (
                <React.Fragment key={w._id}>
                  <Jsx {...w} phase="view" />
                </React.Fragment>
              );
            })}
          </SideBarItem>
        </ShadowClipWrapper>
      </SideBar> */}
    </div>
  </StyledEditTaskGroupArea>
);

export default () => {
  const { moduleId, topicId, taskGroupId } = useParams<{
    moduleId: string;
    topicId: string;
    taskGroupId: string;
  }>();
  const dispatch = useDispatch();

  useEffect(() => {
    resolveEducationModule(moduleId).then(res => {
      const m = res.result as EducationModule;
      dispatch(moduleSlice.actions.setModule(m));
      // const topic = m.topics.find(t => t._id === topicId);
      // const group = topic.taskGroups.find(g => g._id === taskGroupId);
      // dispatch(taskGroupSlice.actions.setGroup(group));
      // debugger;
    });
  }, [moduleId]);

  const state = useSelector((state: RootState) =>
    state.module.topics
      ?.find(t => t._id === topicId)
      .taskGroups.find(t => t._id === taskGroupId)
  );

  const onAddWidget = (type: CmsBlockTypes) => {
    const patch: Partial<TaskGroup> = {
      content: {
        ...state.content,
        blocks: state.content.blocks.concat({
          type,
          _id: undefined,
          data: undefined,
        }),
      },
    };
    // @ts-ignore
    resolveUpdateTaskGroup(moduleId, topicId, taskGroupId, patch).then(
      ({ result }) => {
        if (result) {
          dispatch(moduleSlice.actions.setModule(result));
        }
      }
    );
    // dispatch(taskGroupSlice.actions.addWidget(type));
  };

  const onEditWidget = (id: string) => (params: any) => {
    const newState = JSON.parse(JSON.stringify(state)) as typeof state;
    const widgetToEdit = newState.content?.blocks?.find(w => w._id === id);
    if (!widgetToEdit) return;

    widgetToEdit.data = params;

    const patch: Partial<TaskGroup> = {
      ...newState,
    };

    // @ts-ignore
    resolveUpdateTaskGroup(moduleId, topicId, taskGroupId, patch).then(
      ({ result }) => {
        if (result) {
          dispatch(moduleSlice.actions.setModule(result));
        }
      }
    );
  };

  const onDeleteWidget = (inTaskGroupId: string) => () => {
    const indexToRemove = state.content.blocks.findIndex(
      w => w._id === inTaskGroupId
    );

    const newState = JSON.parse(JSON.stringify(state));
    newState.content.blocks.splice(indexToRemove, 1);
    // @ts-ignore
    resolveUpdateTaskGroup(moduleId, topicId, taskGroupId, newState).then(
      ({ result }) => {
        if (result) {
          dispatch(moduleSlice.actions.setModule(result));
        }
      }
    );
  };

  if (!Array.isArray(state?.content?.blocks)) {
    // debugger;
    return (
      <div>
        <h1>Нет данных</h1>
        <div>Создать виджеты ?</div>
        <button
          onClick={() => {
            // resolveAddTaskGroup(moduleId, topicId, );
            resolveUpdateTaskGroup(moduleId, topicId, taskGroupId, {
              ...state,
              content: {
                ...(state?.content || ({} as CmsDeclaration)),
                blocks: [],
              },
            }).then(() => {
              window.location.reload();
            });
          }}
        >
          Да
        </button>
      </div>
    );
  }

  return (
    <Controllable
      onAddWidget={onAddWidget}
      onDeleteWidget={onDeleteWidget}
      onEditWidget={onEditWidget}
      state={state}
    />
  );
};
