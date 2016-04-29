import { LOCATION_CHANGE } from 'react-router-redux';

import { GET_COLLECTIONS__FETCH_FULFILLED, GET_COLLECTIONS__FETCH_REJECTED } from './collectionActions';

const initialState = {
    collections: null,
    active_collection: null,
};

export default function collectionReducer(previousState = initialState, { payload, type }) {
    switch (type) {
    case LOCATION_CHANGE:
        return previousState;

    case GET_COLLECTIONS__FETCH_FULFILLED:
        return {
            ...previousState,
            collections: payload,
        };

    case GET_COLLECTIONS__FETCH_REJECTED:
        return {
            ...previousState,
            collections: null,
        };

    default:
        return previousState;
    }
}
