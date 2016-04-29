import { LOCATION_CHANGE } from 'react-router-redux';

import { GET_COLLECTIONS__FETCH_FULFILLED, GET_COLLECTIONS__FETCH_REJECTED } from './collectionActions';
import { ALBUM_FORM_SUBMIT__FETCH_FULFILLED } from '../album/albumActions';

const initialState = {
    all: null,
    active_collection: null,
};

export default function collectionReducer(previousState = initialState, { payload, type }) {
    switch (type) {
    case LOCATION_CHANGE:
        return previousState;

    case GET_COLLECTIONS__FETCH_FULFILLED:
        return {
            ...previousState,
            all: payload,
        };

    case GET_COLLECTIONS__FETCH_REJECTED:
        return {
            ...previousState,
            all: null,
        };

    default:
        return previousState;
    }
}
