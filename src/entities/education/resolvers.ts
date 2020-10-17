import { EducationModule, TaskGroup, Topic } from ".";
import httpFetch from "../../utils/httpFetch";

export const resolveEducationModules = () => {
  return httpFetch("/lesson/getModules");
};

export const resolveEducationModule = (id: string) => {
  return httpFetch("/lesson/getModule", {
    body: {
      moduleId: id,
    },
  });
};

export const resolveCreateEducationModule = (data: EducationModule) => {
  return httpFetch("/lesson/createModule", {
    body: {
      data,
    },
  });
};

export const resolveAddTopic = (moduleId: string, data: Topic) => {
  return httpFetch("/lesson/addTopic", {
    body: {
      moduleId,
      data,
    },
  });
};

export const resolveUpdateTopic = (
  moduleId: string,
  topicId: string,
  data: Topic
) => {
  return httpFetch("/lesson/updateTopic", {
    body: {
      moduleId,
      topicId,
      data,
    },
  });
};

export const resolveAddTaskGroup = (
  moduleId: string,
  topicId: string,
  data: TaskGroup
) => {
  return httpFetch("/lesson/addTaskGroup", {
    body: {
      moduleId,
      topicId,
      data,
    },
  });
};

export const resolveUpdateTaskGroup = (
  moduleId: string,
  topicId: string,
  taskGroupId: string,
  data: TaskGroup
) => {
  return httpFetch("/lesson/addTaskGroup", {
    body: {
      moduleId,
      topicId,
      taskGroupId,
      data,
    },
  });
};
