import { EducationMeta } from "../education/meta";


export enum CmsBlockTypes {
    textQuestion = 'textQuestion',
    testSingle = 'testSingle',
    testMultiple = 'testMultiple',
    testMultipleCombination = 'testMultipleCombination',
    richContent = 'richContent',
}

export interface CmsBlockData {
    styles?: string;
    educationMeta: EducationMeta,
}

export interface CmsBlock {
    _id: string,
    type: CmsBlockTypes,
    data: CmsBlockData,
}

export class CmsDeclaration {
    _id: string;
    time: number;
    version: string;
    blocks: CmsBlock[];
}


export interface TestSingleProps extends CmsBlock {
    type: CmsBlockTypes.testSingle,
    data: CmsBlockData & {
        autoCheck: boolean,
        title: string,
        description?: string,
        options: string[],
        answer: string,
    }
}

export interface TestMultipleProps extends CmsBlock {
    type: CmsBlockTypes.testMultiple,
    data: CmsBlockData & {
        autoCheck: boolean,
        allowPartial: boolean,
        title: string,
        description?: string,
        options: string[],
        answers: string[],
    }
}

export interface TextQuestion extends CmsBlock {
    type: CmsBlockTypes.testMultipleCombination,
    data: CmsBlockData & {
        autoCheck: boolean,
        title: string,
        description?: string,
        answer: string,
        answers: string[],
    }
}

export interface RichContent extends CmsBlock {
    type: CmsBlockTypes.richContent,
    data: CmsBlockData & {
        time: number,
        verion: string,
        blocks: CmsBlock[],
    }
}