import { replace } from 'react-router-redux';

export const GET_COLLECTIONS__FETCH = 'GET_COLLECTIONS__FETCH';
export const GET_COLLECTIONS__FETCH_FULFILLED = `${GET_COLLECTIONS__FETCH}_FULFILLED`;
export const GET_COLLECTIONS__FETCH_REJECTED = `${GET_COLLECTIONS__FETCH}_REJECTED`;

export function getCollectionsFetch() {
    return {
        type: GET_COLLECTIONS__FETCH,
        payload: {
            options: {
                method: 'get',
            },
            url: `${API_URL}/api/collections`, // eslint-disable-line no-undef
        },
        meta: {
            rejectedAction: replace('/'),
        },
    };
}
