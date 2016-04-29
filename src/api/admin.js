import koa from 'koa';
import koaRoute from 'koa-route';
const app = koa();

app.use(koaRoute.get('/', function* primaryEntryPoint() {
    this.status = 200;
    this.body = { status: 'ok' };
}));

export default app;
