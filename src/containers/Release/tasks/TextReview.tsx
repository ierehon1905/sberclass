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
    return (
        <div>
            <JobBlock
                text="Необходимо ревью"
                status={props.task.state.status}
            />
            <ControllableEditArea
                state={props.module.topics[0].taskGroups[0]}
                onEditWidget={() => { }}
                onDeleteWidget={() => { }}
                phase={props.task.state.editable ? 'edit' : 'view'}
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

export const CardView = ({ setTaskState, task, type }) => {
    const user = resolveUser() || {};

    useEffect(() => {
        // @ts-ignore
        const isAuth = user.role === userRoles.CORRECTOR;

        setTaskState(task.type, {
            needAction: task.state.status === taskStatuses.ERROR ? !isAuth : isAuth,
            editable: task.state.status === taskStatuses.ERROR ? !isAuth : isAuth,
        });

        console.log('CardView TextReview', {
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
