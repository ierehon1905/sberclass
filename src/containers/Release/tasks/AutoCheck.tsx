import React from 'react';
import { taskStatuses } from '.';
import { Spoiler } from '../../../components/Spoilter';


export type Props = {
    context: any,
    taskState: any,
    setTaskState: (data: any) => void,
    setReleaseContext: (data: any) => void,
}

export const View = () => {
    return (
        <div >
            <Spoiler title="Проверка ебать" >
                ААААААААААА
            </Spoiler>

            <Spoiler title="Проверка ывфвфывф" >
                фывфвфывфвыв
            </Spoiler>

            <Spoiler title="sasai uhuhuhuhu" >
                фывфвфывфвыв
            </Spoiler>
        </div>
    )
}

export default {
    view: View,
    triggerStart: ({ setTaskState, task }) => {
        setTimeout(() => {
            setTaskState(task.type, { status: taskStatuses.COMPLETED })
        }, 5000)
    },
    triggerEnd: null,
    triggerError: null,
}
