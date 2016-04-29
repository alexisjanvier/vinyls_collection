import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import collection from '../collection/collectionReducer';

const rootReducer = combineReducers({
    collection,
    form,
    routing: routerReducer,
});

export default rootReducer;
