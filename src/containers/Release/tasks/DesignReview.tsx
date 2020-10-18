import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { taskStatuses } from ".";
import { CmsBlockTypes } from "../../../entities/cms";
import { TaskGroup } from "../../../entities/education";
import { resolveUpdateTaskGroup } from "../../../entities/education/resolvers";
import { moduleSlice } from "../../../store";
import { ControllableEditArea } from "../../EditTaskGroup";
import { PipelineViewProps } from "./TextReview";
import { JobBlock } from "./AutoCheck";
import { resolveUser } from "../../../entities/user/resolvers";
import { userRoles } from "../../../entities/user";


export const View = (props: PipelineViewProps) => {
    const dispatch = useDispatch();
    const onAddWidget = (type: CmsBlockTypes) => {
        const patch: Partial<TaskGroup> = {
            content: {
                ...props.module.topics[0].taskGroups[0].content,
                blocks: props.module.topics[0].taskGroups[0].content.blocks.concat({
                    type,
                    _id: undefined,
                    data: undefined,
                }),
            },
        };

        resolveUpdateTaskGroup(
            props.module._id,
            props.module.topics[0]._id,
            props.module.topics[0].taskGroups[0]._id,
            //  @ts-ignore
            patch
        ).then(({ result }) => {
            if (result) {
                dispatch(moduleSlice.actions.setModule(result));
            }
        });
        // dispatch(taskGroupSlice.actions.addWidget(type));
    };

    const onEditWidget = (id: string) => (params: any) => {
        const newState = JSON.parse(
            JSON.stringify(props.module.topics[0].taskGroups[0])
        ) as TaskGroup;
        const widgetToEdit = newState.content?.blocks?.find(w => w._id === id);
        if (!widgetToEdit) return;

        widgetToEdit.data = params;

        const patch: Partial<TaskGroup> = {
            ...newState,
        };

        resolveUpdateTaskGroup(
            props.module._id,
            props.module.topics[0]._id,
            props.module.topics[0].taskGroups[0]._id,
            //  @ts-ignore
            patch
        ).then(({ result }) => {
            if (result) {
                dispatch(moduleSlice.actions.setModule(result));
            }
        });
    };

    const onDeleteWidget = (inTaskGroupId: string) => () => {
        const indexToRemove = props.module.topics[0].taskGroups[0].content.blocks.findIndex(
            w => w._id === inTaskGroupId
        );

        const newState = JSON.parse(
            JSON.stringify(props.module.topics[0].taskGroups[0])
        );
        newState.content.blocks.splice(indexToRemove, 1);

        resolveUpdateTaskGroup(
            props.module._id,
            props.module.topics[0]._id,
            props.module.topics[0].taskGroups[0]._id,
            //  @ts-ignore
            newState
        ).then(({ result }) => {
            if (result) {
                dispatch(moduleSlice.actions.setModule(result));
            }
        });
    };
    return (
        <div>
            <JobBlock
                text="Необходимо ревью"
                status={props.task.state.status}
            />
            <ControllableEditArea
                state={props.module.topics[0].taskGroups[0]}
                onEditWidget={onEditWidget}
                onDeleteWidget={onDeleteWidget}
                phase="edit"
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
    view: View,
    cardView: CardView,
    triggerStart: null,
    triggerEnd: null,
    triggerError: null,
};
