import { users } from './index';

export const resolveUser = () => {
    // @ts-ignore
    const role = window.location.search.replace('?role=', '');

    console.log('userRole', role);

    const user = users.find(user => user.role === role);

    console.log('user', user)

    return user
}