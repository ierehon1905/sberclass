import React, { useEffect, useState } from 'react';
import { taskStatuses } from '.';
import { Spoiler } from '../../../components/Spoilter';
import styled from 'styled-components';
import Icon from "../../../components/Icon";

const JobContainer = styled.div<any>`
    padding: 12px;
    display: flex;
    flexDirection: row;
    alignItems: center;
`

const JobText = styled.div<any>`
    ${props => props.code ? 'background-color: #eee; padding: 12px;' : ''}
    font-size: 14px;
    alignItems: center;
    max-width: 400px;
    overflow: scroll;
`

const JobMessage = styled.div`
    font-size: 24px;
    font-weight: bold;
    alignItems: center;
`

const JobStatus = styled.div`
    font-size: 24px;
    font-weight: bold;
    alignItems: center;
`


export const JobBlock = ({ text, status, message, code }: any) => (
    <>
        <JobContainer>
            {status &&
                <JobStatus >
                    <Icon
                        // style={{ position: "absolute", right: 60, top: 16 }}
                        glyph={status}
                        isColored
                    />
                </JobStatus>
            }
            <JobText code={code} >{text || code}</JobText>
        </JobContainer>
        {message &&
            <JobMessage>{text}</JobMessage>
        }
    </>
);

export const View = ({ extractedContent = {}, task, setTaskState }: any) => {
    const {
        imageBlocks = [],
        textBlocks = [],
        urlBlocks = [],
    } = extractedContent;

    const { failedChecks = {}, checkStates = {} } = task.state;

    return (
        <div >
            <Spoiler status={checkStates.urls} expanded={checkStates.urls === taskStatuses.ERROR} title="Проверка ссылок" >
                {urlBlocks.map(block =>
                    <JobBlock
                        code={block.url}
                        status={failedChecks.urls && failedChecks.urls.includes(block._id) ? taskStatuses.ERROR : null}
                    />
                )}
            </Spoiler>

            <Spoiler status={checkStates.images} expanded={checkStates.images === taskStatuses.ERROR} title="Проверка изображений" >
                {imageBlocks.map(block =>
                    <>
                        <img style={{ maxWidth: 400, maxHeight: 250 }} src={block.url} />
                        <JobBlock
                            code={block.url}
                            status={failedChecks.images && failedChecks.images.includes(block._id) ? taskStatuses.ERROR : null}
                        />
                    </>
                )}
            </Spoiler>

            <Spoiler status={checkStates.texts} expanded={checkStates.texts === taskStatuses.ERROR} title="Проверка текста" >
                {textBlocks.map(block =>
                    <JobBlock
                        code={block.text}
                        status={failedChecks.texts && failedChecks.texts.includes(block._id) ? taskStatuses.ERROR : null}
                    />
                )}
            </Spoiler>

        </div>
    )
}

export const CardView = ({ task, setTaskState, extractedContent = {} }: any) => {

    const { failedChecks = {}, checkStates = {} } = task.state;

    const {
        imageBlocks = [],
    } = extractedContent;

    useEffect(() => {
        console.log('images check start', imageBlocks);

        if (task.state.status === taskStatuses.PENDING) {
            imageBlocks.forEach(block => {
                const img = new Image();
                img.src = block.url;

                // @ts-ignore
                img.onload = function (e: any) {
                    // @ts-ignore
                    if (this.width > 5000 || this.height > 5000) {
                        setTaskState(task.type, {
                            checkStates: {
                                images: taskStatuses.ERROR,
                            },
                            failedChecks: {
                                images: [block._id]
                            }
                        })
                    }
                }
            });
        }


    }, [task.state.status === taskStatuses.PENDING])


    useEffect(() => {
        if (failedChecks.images) {
            setTaskState(task.type, {
                status: taskStatuses.ERROR,
                error: "Ошибка проверки изображений",
            })
        }

    }, [failedChecks.images])

    return null
}

export default {
    view: View,
    cardView: CardView,
    triggerStart: ({ setTaskState, task }) => {
        setTimeout(() => {
            setTaskState(task.type, {
                checkStates: {
                    urls: taskStatuses.PENDING,
                    images: taskStatuses.PENDING,
                    texts: taskStatuses.PENDING,
                },
                failedChecks: task.state.failedChecks || {},
            })
        }, 0);

        setTimeout(() => {
            setTaskState(task.type, {
                checkStates: {
                    ...task.state.checkStates,
                    urls: taskStatuses.COMPLETED,
                }
            })
        }, 3000)

        setTimeout(() => {
            setTaskState(task.type, {
                checkStates: {
                    ...task.state.checkStates,
                    texts: taskStatuses.COMPLETED,
                }
            })
        }, 2500)


        setTimeout(() => {
            setTaskState(task.type, {
                checkStates: {
                    ...task.state.checkStates,
                    images: !task.state.failedChecks.images ? taskStatuses.COMPLETED : taskStatuses.ERROR
                }
            })
        }, 3100)

        setTimeout(() => {
            setTaskState(task.type, {
                ...task.state.checkStates,
                status: task.state.status !== taskStatuses.ERROR ? taskStatuses.COMPLETED : taskStatuses.ERROR,
            })
        }, 3500)
    },
    triggerEnd: null,
    triggerError: null,
}
