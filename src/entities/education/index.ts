import { CmsDeclaration } from "../cms";
import { EducationMeta } from "./meta";

export class TaskGroup {
    _id: string;
    name: string;
    description?: string;
    educationMeta: EducationMeta;
    content: CmsDeclaration
}

export class Topic {

    _id: string;
    name: string;
    description?: string;
    educationMeta: EducationMeta;
    taskGroups: TaskGroup[];
}
export class EducationField {
    name: string;
}

export class EducationModule {
    _id: string;
    name: string;
    description?: string;
    topics: Topic[];
    field: EducationField;
}