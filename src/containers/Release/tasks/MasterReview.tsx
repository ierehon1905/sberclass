import React, { useEffect } from "react";
import { taskStatuses } from ".";
import { EducationModule } from "../../../entities/education";
import { userRoles } from "../../../entities/user";
import { resolveUser } from "../../../entities/user/resolvers";
import { ControllableEditArea } from "../../EditTaskGroup";
import { JobBlock } from "./AutoCheck";

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

    // @ts-ignore
    const revision = props.currentRevision || props.module;

    return (
        <div>
            <JobBlock
                text="Необходимо ревью"
                status={props.task.state.status}
            />
            <ControllableEditArea
                state={revision.topics[0].taskGroups[0]}
                onEditWidget={() => { }}
                onDeleteWidget={() => { }}
                // @ts-ignore
                phase={(props.task.state.editable && !props.currentRevision) ? 'edit' : 'view'}
            />
        </div>
    );
};

export const CardView = ({ setTaskState, task, type }) => {
    const user = resolveUser() || {};

    useEffect(() => {
        // @ts-ignore
        const isAuth = user.role === userRoles.MASTER;

        setTaskState(task.type, {
            needAction: isAuth,
            editable: isAuth,
        });

        console.log('CardView Master', {
            isAuth
        })
    }, [])

    return null;
}

export default {
    cardView: CardView,
    view: View,
    triggerStart: null,
    triggerEnd: null,
    triggerError: null,
};
