import AlbumPage from './AlbumPage';
import AlbumCreationPage from './AlbumCreationPage';

export default [
    {
        path: '/album/:id',
        component: AlbumPage,
    },
    {
        path: '/add-album',
        component: AlbumCreationPage,
    },
];
