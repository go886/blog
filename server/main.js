const Koa = require('koa');
const path = require('path');
const static = require('koa-static');
const router = require('./router')

const main = static(path.join(__dirname, '../dist'));
const app = new Koa();

app.use(main)
app
  .use(router.routes())
  .use(router.allowedMethods());
console.log('listen')
app.listen(3000);