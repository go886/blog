const Router = require('koa-router')
const manager = require('./api/manager')
const api = require('./api')

const router = new Router();
const r = [
  {
    target: manager.user,
    prefix: '/api/mgr/user',
    paths: [
      '/update',
      '/get',
      '/login',
    ]
  },
  {
    target: manager.cate,
    prefix: '/api/mgr/cate',
    paths: [
      '/add',
      '/remove',
      '/update',
      '/get',
      '/query',
    ]
  },
  {
    target: manager.article,
    prefix: '/api/mgr/article',
    paths: [
      '/add',
      '/remove',
      '/update',
      '/get',
      '/query',
      '/view',
      '/firtst',
      '/last',
      '/publish',
    ]
  },
  {
    target: manager.link,
    prefix: '/api/mgr/link',
    paths: [
      '/add',
      '/remove',
      '/update',
      '/get',
      '/query'
    ]
  },
  {
    target: manager.setting,
    prefix: '/api/mgr/setting',
    paths: [
      '/update',
      '/get',
    ]
  },
  {
    target: api.cate,
    prefix: '/api/cate',
    paths: [
      '/get',
      '/query'
    ]
  },
  {
    target: api.article,
    prefix: '/api/article',
    paths: [
      '/get',
      '/query'
    ]
  },
]

r.forEach(v => {
  (function (o) {
    const r = new Router({
      prefix: o.prefix
    });
    o.paths && o.paths.forEach(path => {
      r.get(path, async ctx => {
        var result = await o.target[path.substr(1)].call(o.target, ctx)
        ctx.response.type = 'json'
        ctx.response.body = result
      });
    })
    router.use(r.routes())
  })(v)
});

module.exports = router