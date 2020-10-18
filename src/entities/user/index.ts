export enum userRoles {
    AUTHOR = 'AUTHOR',
    DESIGNER = 'DESIGNER',
    CORRECTOR = 'CORRECTOR',
    MASTER = 'MASTER',
    TEACHER = 'TEACHER',
}

export const masterUser = {
    displayName: 'Василий Иванович',
    pic: "https://vilianov.com/wp-content/uploads/2015/11/userpic.png",
    roleText: 'Главный редактор',
    role: userRoles.TEACHER
}

export const authorUser = {
    displayName: 'Илья Ильич',
    pic: "https://vilianov.com/wp-content/uploads/2015/11/userpic.png",
    roleText: 'Автор',
    role: userRoles.AUTHOR
}

export const designerUser = {
    displayName: 'Клим Климович',
    pic: "https://vilianov.com/wp-content/uploads/2015/11/userpic.png",
    roleText: 'Дизайнер',
    role: userRoles.DESIGNER
}

export const techerUser = {
    displayName: 'Сергей Леонидович',
    pic: "https://vilianov.com/wp-content/uploads/2015/11/userpic.png",
    roleText: 'Главный редактор',
    role: userRoles.MASTER
}

export const correctorUser = {
    displayName: 'Иван Демидов',
    pic: "https://vilianov.com/wp-content/uploads/2015/11/userpic.png",
    roleText: 'Корректор',
    role: userRoles.CORRECTOR
}

export const users = [
    authorUser,
    designerUser,
    masterUser,
    correctorUser,
    techerUser,
]