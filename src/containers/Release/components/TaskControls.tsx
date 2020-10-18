import React, { useState } from 'react';
import { taskStatuses } from '../tasks';

export const TaskControls = ({ task, setTaskState }) => {
    const { needAction, error } = task.state;

    if (!needAction) {
        return null
    }

    const errorMessage = "Отказано";

    return (
        <div >
            {error && (
                <button
                    onClick={() => setTaskState(task.type, {
                        status: taskStatuses.PENDING,
                        error: null,
                        needAction: true
                    })}
                >
                    Повторить шаг
                </button>
            )}

            {!error && (
                <>
                    <button
                        onClick={() => setTaskState(task.type, {
                            status: taskStatuses.ERROR,
                            error: errorMessage,
                            needAction: true
                        })}
                    >
                        Отказать
                    </button>
                    <button
                        onClick={() => setTaskState(task.type, {
                            status: taskStatuses.COMPLETED,
                            error: null,
                            needAction: false
                        })}
                    >
                        Подтвердить
                    </button>
                </>
            )}
        </div>
    )
}