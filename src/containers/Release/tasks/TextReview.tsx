import React from "react";
import { taskStatuses } from ".";
import { EducationModule } from "../../../entities/education";
import { ControllableEditArea } from "../../EditTaskGroup";

export type PipelineViewProps = {
  task?: { type: string; props: object; state: any };
  tasksMap?: any;
  context: any;
  setTaskState: (type: string, data: any) => void;
  setReleaseContext: (data: any) => void;
  setSelectedTask?: (...args: any[]) => void;
  module: EducationModule;
};

export const View = (props: PipelineViewProps) => {
  return (
    <div>
      <ControllableEditArea
        state={props.module.topics[0].taskGroups[0]}
        onEditWidget={() => {}}
        onDeleteWidget={() => {}}
        phase="view"
      />
      <button
        onClick={() =>
          props.setTaskState(props.task.type, {
            status: taskStatuses.COMPLETED,
          })
        }
      >
        Утвердить
      </button>
    </div>
  );
};

export default {
  view: View,
  triggerStart: null,
  triggerEnd: null,
  triggerError: null,
};
