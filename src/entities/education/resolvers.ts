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
    return httpFetch("/lesson/updateTaskGroup", {
        body: {
            moduleId,
            topicId,
            taskGroupId,
            data,
        },
    });
};

export const resolveUpdateBlock = (
    moduleId: string,
    topicId: string,
    taskGroupId: string,
    blockId: string,
    data: any
) => {
    return httpFetch("/lesson/updateBlock", {
        body: {
            moduleId,
            topicId,
            taskGroupId,
            blockId,
            data,
        },
    });
};



export const resolveGetRevisions = (
    moduleId: string,
) => {
    return httpFetch("/lesson/getRevisions", {
        body: {
            moduleId,
        },
    });
};

export const resolveCreateRevisionBackend = (
    moduleId: string,
    message,
) => {
    return httpFetch("/lesson/createRevisionBackend", {
        body: {
            moduleId,
            message
        },
    });
};

export const resolveGetRelease = () => {
    return httpFetch("/lesson/getRelease");
};

export const resolveUpdateRelease = (release) => {
    return httpFetch("/lesson/updateRelease", {
        body: {
            release
        }
    });
};

export const resolveExtractContent = (moduleId, revisionId) => {
    return httpFetch("/lesson/extractContent", {
        body: {
            moduleId,
            revisionId,
        }
    });
};



