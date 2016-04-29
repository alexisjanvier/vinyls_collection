import config from 'config';
import koa from 'koa';
import koaRoute from 'koa-route';
import koaMount from 'koa-mount';
import amazon from 'amazon-product-api';

import collectionApiRoutes from './collection/collectionApiRoutes';
import albumApiRoutes from './album/albumApiRoutes';

const app = koa();

app.use(koaMount('/collections', collectionApiRoutes));
app.use(koaMount('/albums', albumApiRoutes));

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
