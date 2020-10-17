import { EducationModule } from "."
import httpFetch from "../../utils/httpFetch"

export const resolveEducationModules = () => {
    return httpFetch('/lesson/getModules')
}

export const resolveEducationModule = (id: string) => {
    return httpFetch('/lesson/getModules', {
        body: {
            moduleId: id
        }
    })
}

export const resolveCreateEducationModule = (data: EducationModule) => {
    return httpFetch('/lesson/createModule', {
        body: {
            data
        }
    })
}

export const resolveUpdateEducationModule = (id: string, data: EducationModule) => {
    return httpFetch('/lesson/updateModule', {
        body: {
            moduleId: id,
            data
        }
    })
}