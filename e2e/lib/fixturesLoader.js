import data from '../fixtures/demo_fixtures.json';
import albumRepository from '../../src/api/album/albumRepository';
import collectionRepository from '../../src/api/collection/collectionRepository';

export default function (client) {
    function* loadDefaultFixtures() {
        const collections = yield collectionRepository(client).batchInsert(data.collections);
        const preparedAlbums = data.albums.map(a => {
            const album = a;
            const albumCollection = collections.find(c => c.name === album.collection);
            album.collection_id = albumCollection.id;
            delete album.collection;

            return album;
        });
        yield albumRepository(client).batchInsert(preparedAlbums);
    }

    function* removeAllFixtures() {
        yield client.query_('TRUNCATE collection CASCADE');
    }

    return {
        loadDefaultFixtures,
        removeAllFixtures,
    };
}
