import App from './App';

export default () => {
    return {
        component: 'div',
        childRoutes: [{
            path: '/',
            component: App,
            childRoutes: [

            ],
        }],
    };
};
