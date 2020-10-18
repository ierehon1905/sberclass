import React, { useState } from "react";
import Button from "../../../components/Button";
import { taskStatuses } from "../tasks";

export const TaskControls = ({ task, setTaskState }) => {
    const { needAction, error } = task.state;

    console.log('TaskControlls', task.state)

    if ((!needAction && !error) || task.state.status === taskStatuses.COMPLETED) {
        return null;
    }

    const errorMessage = "Отказано";

    return (
        <div
            style={{
                position: "relative",
                display: "flex",
                justifyContent: "flex-end",
            }}
        >
            {error && (
                <Button
                    onClick={() =>
                        setTaskState(task.type, {
                            status: taskStatuses.PENDING,
                            error: null,
                            needAction: true,
                        })
                    }
                >
                    Повторить шаг
                </Button>
            )}

            {!error && (
                <>
                    <Button
                        theme="dangerous"
                        icon="cross"
                        onClick={() =>
                            setTaskState(task.type, {
                                status: taskStatuses.ERROR,
                                error: errorMessage,
                                needAction: true,
                            })
                        }
                    >
                        Отказать
                     </Button>
                    <Button
                        theme="accent"
                        icon="arrow-right"
                        style={{ marginLeft: 8 }}
                        onClick={() =>
                            setTaskState(task.type, {
                                status: taskStatuses.COMPLETED,
                                error: null,
                                needAction: false,
                            })
                        }
                    >
                        Подтвердить
                 </Button>
                </>
            )}
        </div>
    );
};
