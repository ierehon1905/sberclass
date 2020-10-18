import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Content from "../../components/Content";
import { SideBar } from "../../components/SideBar";
import { SideBarItem } from "../../components/SideBarItem";
import { ShadowClipWrapper } from "../../components/SideBarItem/ShadowClipWrapper";
import View from "../../components/View";
import { TaskCard } from "./taskCard";
import { TaskHeader } from "./components/TaskHeader";

import { taskStatuses } from "./tasks";
import { resolveCreateRevisionBackend, resolveExtractContent, resolveGetRelease, resolveGetRevisions, resolveUpdateBlock, resolveUpdateRelease } from "../../entities/education/resolvers";

import Start from "./tasks/Start";
import AutoCheck from "./tasks/AutoCheck";
import MasterReview from "./tasks/MasterReview";
import DesignReview from "./tasks/DesignReview";
import Publish from "./tasks/Publish";
import TextReview, { PipelineViewProps } from "./tasks/TextReview";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { EducationModule } from "../../entities/education";
import { resolveEducationModule } from "../../entities/education/resolvers";
import { moduleSlice, RootState } from "../../store";
import { shadows } from "../../utils/theme";
import { resolveUser } from "../../entities/user/resolvers";
import Connections from "./Connections";
import Icon from "../../components/Icon";
import TaskViewComponent from "./TaskViewComponent";

const StyledReleaseArea = styled.div`
  width: 100vw;
  overflow-x: hidden;
`;

const tasksMap = {
  Start,
  AutoCheck,
  Publish,
  DesignReview,
  MasterReview,
  TextReview,
};

export const releaseMock = {
  moduleId: "5f8ae6a09d39c34503e6dd06",
  context: {},
  pipeline: {
    steps: [
      {
        id: 1,
        tasks: [
          {
            type: "Start",
            props: {},
            state: {},
          },
        ],
      },
      {
        tasks: [
          {
            type: "AutoCheck",
            props: {},
            state: {},
          },
        ],
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
          },
        ],
      },
      {
        id: 4,
        tasks: [
          {
            type: "MasterReview",
            props: {},
            state: {},
          },
        ],
      },
      {
        id: 5,
        tasks: [
          {
            type: "Publish",
            props: {},
            state: {},
          },
        ],
      },
    ],
  },
};

const Release = () => {
  const user = resolveUser();
  const [release, setRelease] = useState();

  const { moduleId } = useParams<{
    moduleId: string;
  }>();

  const dispatch = useDispatch();

  useEffect(() => {
    if (release) {
      resolveEducationModule(moduleId).then(res => {
        const m = res.result as EducationModule;
        dispatch(moduleSlice.actions.setModule(m));
      });

      const field = document.getElementsByClassName("release-field-scroll")[0];
      // debugger;
      field.scroll({
        top: 600,
        behavior: "smooth",
      });
    }
  }, [moduleId, Boolean(release)]);

  const module = useSelector((state: RootState) => state.module);

  const [selectedTask, setSelectedTask] = useState();

  const [revisions, setRevisions] = useState([]);
  const [currentRevision, setCurrentRevision] = useState();
  const [extractedContent, setExtractedContent] = useState();


  // CONTENT
  const getContent = () => {
    const id = currentRevision ? null : moduleId;
    // @ts-ignore
    const revId = currentRevision ? currentRevision._id : null;

    return resolveExtractContent(moduleId, revId).then(({ result }) => setExtractedContent(result))
  }


  const updateBlock = (blockId, data) => {
    const topicId = module.topics[0]._id;
    const taskGroupId = module.topics[0].taskGroups[0]._id;
    // @ts-ignore
    return resolveUpdateBlock(moduleId, topicId, taskGroupId, blockId, data).then(() => {
      return resolveEducationModule(moduleId).then(res => {
        const m = res.result as EducationModule;
        dispatch(moduleSlice.actions.setModule(m));
      });
    })
  }

  useEffect(() => {
    if (module) {
      getContent();
    }
  }, [module])
  // CONTENT END

  // REVISIONS
  const getRevisions = () => {
    return resolveGetRevisions(moduleId).then(({ result }) => setRevisions(result))
  }

  const createRevision = (message) => {
    return resolveCreateRevisionBackend(moduleId, message).then(() => {
      return getRevisions();
    });
  };
  // REVISIONS END

  // RELEASE
  const getRelease = () => {
    return resolveGetRelease().then(({ result }) => setRelease(result))
  }

  const updateRelease = () => {
    return resolveUpdateRelease(release);
  }

  useEffect(() => {
    if (release) {
      updateRelease();
    }
  }, [release])
  // RELEASE END

  // DID MOUNT
  useEffect(() => {
    getRelease();
    resolveEducationModule(moduleId).then(res => {
      const m = res.result as EducationModule;
      dispatch(moduleSlice.actions.setModule(m));
    });
    getRevisions();
  }, [moduleId]);

  if (!release) {
    return null
  }


  const selectTask = type => {
    let _task;

    release.pipeline.steps.forEach(step => {
      _task = step.tasks.find(task => task.type === type);
    });

    return _task;
  };

  const setReleaseContext = (data = {}) => {
    setRelease({ ...release, context: { ...release.context, ...data } });
  };

  const setTaskState = (type: string, data = {}) => {
    release.pipeline.steps.forEach(step => {
      const task = step.tasks.find(task => task.type === type);

      if (task) {
        task.state = { ...task.state, ...data };
      }
    });

    setRelease({ ...release });
  };

  // @ts-ignore
  const TaskView =
    selectedTask && selectedTask.type && tasksMap[selectedTask.type].view
      ? tasksMap[selectedTask.type].view
      : null;

  const currentStep = release.pipeline.steps.find(step =>
    // @ts-ignore
    step.tasks.some(task => task.state.status !== taskStatuses.COMPLETED)
  );

  const releaseApiProps = {
    updateBlock,
    extractedContent,
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
    module,
  };

  console.log("Release", {
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
          <br />
          <div>Модуль {module.name}</div>
          <div>ID {module._id}</div>
          <div>{module.description}</div>
          <br />
          <div>Кол-во тем: {module.topics?.length || 0}</div>
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
        <div
          style={{
            paddingLeft: "260px",
            overflow: "scroll",
            height: "calc(100vh - 60px)",
          }}
          className="release-field-scroll"
        >
          <div
            style={{
              minWidth: "2300px",
              minHeight: "600px",
              marginTop: "60px",
              display: "flex",
              alignItems: "center",
              position: "relative",
              flexDirection: "row",
            }}
            className="release-field"
          >
            {release.pipeline.steps.map((step, stepIndex) => (
              <div
                style={{
                  flexDirection: "column",
                  marginLeft: "150px",
                  justifyContent: "center",
                  position: "relative",
                  zIndex: 2,
                }}
                className="step-column"
                id={"step-column__" + stepIndex}
              >
                {step.tasks.map((task, taskIndex) => (
                  <TaskCard
                    {...releaseApiProps}
                    setSelectedTask={setSelectedTask}
                    tasksMap={tasksMap}
                    key={`${taskIndex}-${stepIndex}`}
                    shouldStart={currentStep && currentStep.id === step.id}
                    task={task}
                    context={release.context}
                    setTaskState={setTaskState}
                    setReleaseContext={setReleaseContext}
                  />
                ))}
              </div>
            ))}
            <Connections steps={release.pipeline.steps} />
          </div>
        </div>
      </View>
      <TaskViewComponent
        TaskView={TaskView}
        releaseApiProps={releaseApiProps}
      />
    </StyledReleaseArea>
  );
};

export default Release;
