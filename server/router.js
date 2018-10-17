const Router = require('koa-router')
const manager = require('./api/manager')
const api = require('./api')

const router = new Router();
const r = [
  {
    target: manager.user,
    needLogin:true,
    map: [
      ['/api/mgr/user/add', manager.user.add],
      ['/api/mgr/user/remove', manager.user.remove],
      ['/api/mgr/user/update', manager.user.update],
      ['/api/mgr/user/get', manager.user.get],
      ['/api/mgr/user/query', manager.user.query],
      ['/api/login', manager.user.login],
    ]
  },
  {
    target: manager.cate,
    map: [
      ['/api/mgr/cate/add', manager.cate.add],
      ['/api/mgr/cate/remove', manager.cate.remove],
      ['/api/mgr/cate/update', manager.cate.update],
      ['/api/mgr/cate/get', manager.cate.get],
      ['/api/mgr/cate/query', manager.cate.query]
    ]
  },
  {
    target: manager.posts,
    map: [
      ['/api/mgr/post/add', manager.posts.add],
      ['/api/mgr/post/remove', manager.posts.remove],
      ['/api/mgr/post/update', manager.posts.update],
      ['/api/mgr/post/get', manager.posts.get],
      ['/api/mgr/post/query', manager.posts.query],
      ['/api/mgr/post/view', manager.posts.view]
    ]
  },
  {
    target: api.cate,
    map: [
      ['/api/cate/get', api.cate.get],
      ['/api/cate/query', api.cate.query],
    ]
  },
  {
    target: api.posts,
    map: [
      ['/api/post/get', api.posts.get],
      ['/api/post/query', api.posts.query],
    ]
  },
]

r.forEach(v => {
  (function (o) {
    o.map.forEach(item => {
      router.get(item[0], async ctx => {
        var result = await item[1].call(o.target, ctx)
        ctx.response.type = 'json'
        ctx.response.body = result
      });
    })
  })(v)
});

module.exports = router