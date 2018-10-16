const Router = require('koa-router')
const posts = require('./api/posts')
const cagetory = require('./api/category')


const router = new Router();
const r = [
  {
    target: posts,
    map:[
      ['/api/posts', posts.query],
      ['/api/post/:id', posts.get],
      ['/api/postadd', posts.add]
    ]
  }, {
    target: cagetory,
    map:[
      ['/api/categoryadd', cagetory.add]
    ]
  }
]

r.forEach(v => {
  (function(o){
    o.map.forEach(item=>{
      router.get(item[0], async ctx=>{
        var result = await item[1].call(o.target, ctx)
        ctx.response.type = 'json'
        ctx.response.body = result
      });
    })
  })(v)
});

module.exports = router