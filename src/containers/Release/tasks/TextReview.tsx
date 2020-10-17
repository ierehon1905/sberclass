import React from "react";
import { EducationModule } from "../../../entities/education";
import { ControllableEditArea } from "../../EditTaskGroup";

export type PipelineViewProps = {
  task?: { type: string; props: object; state: any };
  tasksMap?: any;
  context: any;
  setTaskState: (data: any) => void;
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
    </div>
  );
};

export default {
  view: View,
  triggerStart: null,
  triggerEnd: null,
  triggerError: null,
};
