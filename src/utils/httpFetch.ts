import { Meta } from '@storybook/react/types-6-0';
import { config } from '../config';


export type Params = {
    body?: any,
    method?: 'PUT' | 'GET' | 'POST',
}

const request = async (pathname: string, params: Params = {}) => {
    const url = config.backend.url;

    const requestUrl = url + pathname;

    const requestParams = {
        pathname,
        method: params.method || 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: params.body ? JSON.stringify(params.body) : undefined,
    };

    // eslint-disable-next-line
    if (true) {
        // eslint-disable-next-line
        console.log('REQUEST', requestUrl, params || '');
    }

    return fetch(requestUrl, requestParams)
        .then(async (res) => {
            console.log(res);
            if (res.ok) {
                const data = await res.json();

                // eslint-disable-next-line
                if (true) {
                    // eslint-disable-next-line
                    console.log('RESPONSE', data);
                }

                console.log(data)

                return data;
            }

            const { error } = await res.json();

            // eslint-disable-next-line
            if (true) {
                // eslint-disable-next-line
                console.log('REQUEST ERROR');
                // eslint-disable-next-line
                console.log(error);
            }

            return { error };
        });
};

export default async (path: string, params?: Params) => {

    try {
        const { error, result } = await request(path, params);


        return {
            result,
            error,
        };
    } catch (e) {
        console.log(e)
    }

};
