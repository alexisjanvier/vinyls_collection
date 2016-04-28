import config from 'config';
import koa from 'koa';
import koaRoute from 'koa-route';
import amazon from 'amazon-product-api';

const app = koa();

const client = amazon.createClient({
    awsTag: config.amazon.AWS_TAG,
    awsId: config.amazon.AWS_ID,
    awsSecret: config.amazon.AWS_SECRET,
});

app.use(koaRoute.get('/', function* primaryEntryPoint() {
    this.status = 200;
    this.body = { status: 'ok' };
}));

app.use(koaRoute.get('/amazon/:isbn', function* searchAmazon(isbn) {
    console.log('JE CHERCHE');
    console.log(isbn);
    this.body = yield client.itemSearch({
        keywords: isbn,
        searchIndex: 'Music',
        idType: 'ISBN',
        responseGroup: 'ItemAttributes,Offers,Images',
    });
}));

export default app;
