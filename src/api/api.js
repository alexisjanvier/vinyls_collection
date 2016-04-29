import config from 'config';
import koa from 'koa';
import koaRoute from 'koa-route';
import koaMount from 'koa-mount';
import amazon from 'amazon-product-api';
import coBody from 'co-body';

import collectionApiRoutes from './collection/collectionApiRoutes';
import albumApiRoutes from './album/albumApiRoutes';
import albumRepository from './album/albumRepository';

const app = koa();

app.use(koaMount('/collections', collectionApiRoutes));
app.use(koaMount('/albums', albumApiRoutes));

app.use(koaRoute.post('/add-album', function* addAlbum() {
    const data = yield coBody(this);
    const client = amazon.createClient({
        awsTag: config.amazon.AWS_TAG,
        awsId: config.amazon.AWS_ID,
        awsSecret: config.amazon.AWS_SECRET,
    });
    const amazonData = yield client.itemSearch({
        keywords: data.albumTitle,
        searchIndex: 'Music',
        idType: 'ISBN',
        responseGroup: 'ItemAttributes,Offers,Images',
    });
    if (amazonData.length) {
        const album = {
            collection_id: data.collectionId,
            title: amazonData[0].ItemAttributes[0].Title[0],
            artist: amazonData[0].ItemAttributes[0].Artist || [amazonData[0].ItemAttributes[0].Creator[0]._],
            label: amazonData[0].ItemAttributes[0].Label || null,
            cover_url: {
                thumbnail: amazonData[0].SmallImage[0].URL,
                normal: amazonData[0].MediumImage[0].URL,
                hr: amazonData[0].LargeImage[0].URL,
            },
        };
        const savedAlbum = yield albumRepository(this.client).insertOne(album);
        this.body = savedAlbum;
        this.status = 200;
    } else {
        this.status = 404;
    }
}));

app.use(koaRoute.get('/amazon/:isbn', function* searchAmazon(isbn) {
    const client = amazon.createClient({
        awsTag: config.amazon.AWS_TAG,
        awsId: config.amazon.AWS_ID,
        awsSecret: config.amazon.AWS_SECRET,
    });
    this.body = yield client.itemSearch({
        keywords: isbn,
        searchIndex: 'Music',
        idType: 'ISBN',
        responseGroup: 'ItemAttributes,Offers,Images',
    });
}));

app.use(koaRoute.get('/', function* primaryEntryPoint() {
    this.status = 200;
    this.body = { status: 'ok' };
}));

export default app;
