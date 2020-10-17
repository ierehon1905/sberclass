import React, { ReactElement, ReactNode } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Content from "../../components/Content";
import { SideBar } from "../../components/SideBar";
import { SideBarItem } from "../../components/SideBarItem";
import { ShadowClipWrapper } from "../../components/SideBarItem/ShadowClipWrapper";
import View from "../../components/View";
import { DEV_data, RootState, taskGroupSlice } from "../../store";
import {
  ConfiguredWidget,
  StyledConfiguredWidget,
  WidgetInfo,
  widgetMap,
} from "../Widget";

export type TaskGroup = ConfiguredWidget[];

const DEV_groupConfiguredWidgets: TaskGroup = [
  {
    widgetGuid: "1",
    inTaskGroupId: "2",
    title: "С полем ввода",
    params: {
      text: "Когда?",
    },
  },
  {
    widgetGuid: "2",
    inTaskGroupId: "2",
    title: "С вариантами ответа",
    params: {
      text: "Что?",
      options: ["Да", "Нет"],
    },
  },
  {
    widgetGuid: "3",
    inTaskGroupId: "3",
    title: "Рич текст",
    params: {
      content: `## Test Header
          > Test quote
          `,
    },
  },
];

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
  const state = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  const onAddWidget = (state: string) =>
    dispatch(taskGroupSlice.actions.addWidget(state));
  const onEditWidget = (inTaskGroupId: string) => (params: any) =>
    dispatch(
      taskGroupSlice.actions.editWidget({
        inTaskGroupId: inTaskGroupId,
        params,
      })
    );

  return (
    <StyledEditTaskGroupArea>
      {/* <h2>Редактор группы заданий</h2> */}
      <div className="edit-area">
        <SideBar right>
            <SideBarItem>
              <h2>Библиотека</h2>
            </SideBarItem>
            <ShadowClipWrapper>
            {Object.values(widgetMap).map(gw => (
              <SideBarItem 
              withShadow 
              isClickable
              key={gw.widgetGuid}
              onClick={() => onAddWidget(gw.widgetGuid)}>
                {gw.title}
              </SideBarItem>
            ))}
            </ShadowClipWrapper>
        </SideBar>
        <View>
          <Content>
          <div>
            {state.taskGroup.map(w => {
              const El = widgetMap[w.widgetGuid];
              const Jsx = El.editRender;
              return (
                <React.Fragment key={w.inTaskGroupId}>
                  <Jsx {...w} onChange={onEditWidget(w.inTaskGroupId)} />
                </React.Fragment>
              );
            })}
          </div>
          </Content>
        </View>
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
