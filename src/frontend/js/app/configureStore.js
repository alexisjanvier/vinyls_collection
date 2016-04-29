import { hashHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';

export default function configureStore(rootReducer, initialState) {
    let enhancers = [
        applyMiddleware(
            routerMiddleware(hashHistory),
            thunkMiddleware
        ),
    ];

    if (FRONTEND__APP__ENABLE_DEV_TOOLS) { // eslint-disable-line no-undef
        const DevTools = require('./DevTools');
        enhancers = [
            ...enhancers,
            DevTools.instrument(),
        ];
    }

    return createStore(rootReducer, initialState, compose(...enhancers));
}
