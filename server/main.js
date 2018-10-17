const session = require('koa-session');
const Koa = require('koa');
const path = require('path');
const static = require('koa-static');
const router = require('./router')

const main = static(path.join(__dirname, '../dist'));
const app = new Koa();

app.keys = ['this is my keys....'];
const CONFIG = {
  key: 'koa:sess', /** (string) cookie key (default is koa:sess) */
  /** (number || 'session') maxAge in ms (default is 1 days) */
  /** 'session' will result in a cookie that expires when session/browser is closed */
  /** Warning: If a session cookie is stolen, this cookie will never expire */
  maxAge: 86400000,
  autoCommit: true, /** (boolean) automatically commit headers (default true) */
  overwrite: true, /** (boolean) can overwrite or not (default true) */
  httpOnly: true, /** (boolean) httpOnly or not (default true) */
  signed: true, /** (boolean) signed or not (default true) */
  rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
  renew: false, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
};
app.use(session(CONFIG, app));
// app.use(async (ctx,next)=>{
//   if (!(ctx.session||{}).username && (ctx.path.indexOf('/api/mgr') == 0 || ctx.path == '/admin.html')) {
//     ctx.redirect('/login.html')
//   } else {
//     await next()
//   }
// });
app.use(main)
app
  .use(router.routes())
  .use(router.allowedMethods());
console.log('listen')
app.listen(3000);