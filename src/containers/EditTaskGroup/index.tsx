import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Content from "../../components/Content";
import { SideBar } from "../../components/SideBar";
import { SideBarItem } from "../../components/SideBarItem";
import { ShadowClipWrapper } from "../../components/SideBarItem/ShadowClipWrapper";
import View from "../../components/View";
import { CmsBlockTypes } from "../../entities/cms";
import { EducationModule } from "../../entities/education";
import {
  resolveAddTaskGroup,
  resolveEducationModule,
  resolveUpdateTaskGroup,
} from "../../entities/education/resolvers";
import { moduleSlice, RootState, taskGroupSlice } from "../../store";
import { ConfiguredWidget, widgetMap } from "../Widget";

const StyledEditTaskGroupArea = styled.div`
  flex-grow: 2;
  display: flex;
  flex-direction: column;
  .edit-area {
    display: flex;
    flex-grow: 2;
    background-color: ${p => p.theme.light};
    padding-top: 80px;
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

export default () => {
  // useEffect(() => {
  //   resolveEducationModules().then(res => {
  //     console.log(res);
  //     debugger;
  //   });
  // }, []);
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
      const topic = m.topics.find(t => t._id === topicId);
      const group = topic.taskGroups.find(g => g._id === taskGroupId);
      dispatch(taskGroupSlice.actions.setGroup(group));
      // debugger;
    });
  }, []);

  const state = useSelector((state: RootState) => state.taskGroup);

  const onAddWidget = (type: CmsBlockTypes) =>
    dispatch(taskGroupSlice.actions.addWidget(type));

  const onEditWidget = (id: string) => (params: any) => {
    dispatch(
      taskGroupSlice.actions.editWidget({
        id: id,
        params,
      })
    );
  };

  const onDeleteWidget = (inTaskGroupId: string) => () =>
    dispatch(taskGroupSlice.actions.removeWidget(inTaskGroupId));

  if (!Array.isArray(state.content?.blocks)) {
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
                ...state.content,
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
                key={`${gw.type}-${gw.title}-${i}`}
                onClick={() => onAddWidget(gw.type)}
              >
                {gw.title}
              </SideBarItem>
            ))}
          </ShadowClipWrapper>
        </SideBar>
        <View>
          <Content>
            <div>
              {state.content.blocks.map(w => {
                const El = widgetMap[w.type];
                const Jsx = El.editRender;
                return (
                  <React.Fragment key={w.id}>
                    <Jsx
                      {...w}
                      onChange={onEditWidget(w.id)}
                      onDelete={onDeleteWidget(w.id)}
                    />
                  </React.Fragment>
                );
              })}
            </div>
          </Content>
        </View>

        <SideBar isRight>
          <SideBarItem>
            <h2>Превью</h2>
          </SideBarItem>
          <SideBarItem type="button" data={{ title: "lol" }} />
          <SideBarItem type="textArea" data={{ title: "lol" }} />
          {/* <SideBarItem type="select" data={{ title: "lol" }} /> */}
          <ShadowClipWrapper>
            <SideBarItem>
              {state.content.blocks.map(w => {
                const El = widgetMap[w.type];
                const Jsx = El.previewRender;
                return (
                  <React.Fragment key={w.id + "preview"}>
                    <Jsx {...w} />
                  </React.Fragment>
                );
              })}
            </SideBarItem>
          </ShadowClipWrapper>
        </SideBar>
        {/* <div className="preview">
          Preview
          <div>
            {state.taskGroup.map(w => {
              const El = widgetMap[w.widgetGuid];
              const Jsx = El.previewRender;
              return (
                <React.Fragment key={w.inTaskGroupId}>
                  <Jsx {...w} />
                </React.Fragment>
              );
            })}
          </div>
        </div> */}
      </div>
    </StyledEditTaskGroupArea>
  );
};
