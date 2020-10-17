import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Content from "../../components/Content";
import { SideBar } from "../../components/SideBar";
import { SideBarItem } from "../../components/SideBarItem";
import { ShadowClipWrapper } from "../../components/SideBarItem/ShadowClipWrapper";
import View from "../../components/View";
import { TaskCard } from './taskCard';
import { TaskHeader } from './components/TaskHeader';

import Start from './tasks/Start';
import AutoCheck from './tasks/AutoCheck';
import MasterReview from './tasks/MasterReview';
import DesignReview from './tasks/DesignReview';
import Publish from './tasks/Publish';
import TextReview from './tasks/TextReview';
import { taskStatuses } from "./tasks";
import { resolveCreateRevisionBackend, resolveGetRevisions } from "../../entities/education/resolvers";

const StyledReleaseArea = styled.div`
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

const tasksMap = {
  Start,
  AutoCheck,
  Publish,
  DesignReview,
  MasterReview,
  TextReview,
}

const releaseMock = {
  moduleId: "5f8ae6a09d39c34503e6dd06",
  context: {

  },
  pipeline: {
    steps: [
      {
        id: 1,
        tasks: [
          {
            type: "Start",
            props: {},
            state: {},
          }
        ]
      },
      {
        tasks: [
          {
            type: "AutoCheck",
            props: {},
            state: {},
          }
        ]
      },
      {
        id: 2,
        tasks: [
          {
            type: "TextReview",
            props: {},
            state: {},
          },
          {
            type: "DesignReview",
            props: {},
            state: {},
          }
        ]
      },
      {
        id: 4,
        tasks: [
          {
            type: "MasterReview",
            props: {},
            state: {},
          }
        ]
      },
      {
        id: 5,
        tasks: [
          {
            type: "Publish",
            props: {},
            state: {},
          }
        ]
      }
    ]
  }
}

const Release = () => {
  const [release, setRelease] = useState(releaseMock);
  const [selectedTask, setSelectedTask] = useState(null);

  const [revisions, setRevisions] = useState([]);
  const [currentRevision, setCurrentRevision] = useState([]);

  const { moduleId } = release;


  // REVISIONS
  const getRevisions = () => {
    return resolveGetRevisions(release.moduleId).then(({ result }) => setRevisions(result))
  }

  const createRevision = () => {
    return resolveCreateRevisionBackend(moduleId).then(() => {
      return getRevisions();
    })
  }
  // REVISIONS END

  useEffect(() => {
    getRevisions();
  }, [])

  const selectTask = (type) => {
    let _task;

    release.pipeline.steps.forEach(step => {
      _task = step.tasks.find(task => task.type === type);
    })

    return _task;
  }

  const setReleaseContext = (data = {}) => {
    setRelease({ ...release, context: { ...release.context, ...data } })
  }

  const setTaskState = (type, data = {}) => {
    release.pipeline.steps.forEach(step => {
      const task = step.tasks.find(task => task.type === type);

      if (task) {
        task.state = { ...task.state, ...data };
      }
    })

    setRelease({ ...release })
  }

  // @ts-ignore
  const TaskView = (selectedTask && selectedTask.type && tasksMap[selectedTask.type].view) ? tasksMap[selectedTask.type].view : null;



  // @ts-ignore
  const currentStep = release.pipeline.steps.find((step) => step.tasks.some(task => task.state.status !== taskStatuses.COMPLETED));

  const releaseApiProps = {
    getRevisions,
    createRevision,
    currentRevision,
    setCurrentRevision,
    revisions,
    task: selectedTask,
    tasksMap,
    context: release.context,
    setTaskState,
    setReleaseContext,
    setSelectedTask,
  }

  console.log('Release', {
    releaseApiProps,
    release,
    selectedTask,
    tasksMap,
  });

  return (
    <StyledReleaseArea>
      <SideBar>
        <SideBarItem>
          <h2>Релиз</h2>
        </SideBarItem>
        <ShadowClipWrapper>
          {/* {Object.values(widgetMap).map(gw => (
              <SideBarItem
                withShadow
                isClickable
                key={gw.type}
                onClick={() => onAddWidget(gw.type)}
              >
                {gw.title}
              </SideBarItem>
            ))} */}
        </ShadowClipWrapper>
      </SideBar>
      <View>
        <div style={{ marginLeft: '260px', overflow: 'scroll' }}>
          <div style={{ minWidth: '4000px', minHeight: '1000px', marginTop: "500px", display: "flex", flexDirection: 'row' }}>
            {release.pipeline.steps.map((step, stepIndex) =>
              <div style={{ flexDirection: 'column', marginLeft: '150px', justifyContent: 'center' }} >
                {step.tasks.map((task, taskIndex) =>
                  <TaskCard
                    setSelectedTask={setSelectedTask}
                    tasksMap={tasksMap}
                    key={`${taskIndex}-${stepIndex}`}
                    shouldStart={(currentStep && currentStep.id === step.id)}
                    task={task}
                    context={release.context}
                    setTaskState={setTaskState}
                    setReleaseContext={setReleaseContext}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </View>

      {TaskView &&
        (
          <div style={{ minWidth: '800px', background: 'white', boxShadow: '-2px 2px 30px #eee', position: 'absolute', right: '0', top: '0', bottom: '0', zIndex: 100 }}>
            <TaskHeader {...releaseApiProps} />
            <TaskView {...releaseApiProps} />
          </div>
        )
      }
    </StyledReleaseArea >
  );
};

export default Release
