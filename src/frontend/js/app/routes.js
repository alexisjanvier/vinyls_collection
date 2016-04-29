import App from './App';

import albumRoutes from '../album/albumRoutes';
import collectionRoutes from '../collection/collectionRoutes';

export default () => {
    return {
        component: 'div',
        childRoutes: [{
            path: '/',
            component: App,
            childRoutes: [
                ...albumRoutes,
                ...collectionRoutes,
            ],
        }],
    };
};
