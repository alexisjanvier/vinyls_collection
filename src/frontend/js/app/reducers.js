import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import collections from '../collection/collectionReducer';

const rootReducer = combineReducers({
    collections,
    form,
    routing: routerReducer,
});

export default rootReducer;
