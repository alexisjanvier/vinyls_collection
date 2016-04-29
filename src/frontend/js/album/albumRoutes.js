import AlbumPage from './AlbumPage';
import AlbumCreationPage from './AlbumCreationPage';

export default [
    {
        path: '/album/:collectionId/:albumId',
        component: AlbumPage,
    },
    {
        path: '/add-album',
        component: AlbumCreationPage,
    },
];
