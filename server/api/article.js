const manager = require('./manager').article
const db = require('../model/index')

module.exports = {

    async get(ctx) {
        const id = db.article.decode(ctx.query.id)
        const item = await db.article.get(id)
        if (!item) {
            return { error: '未找到文章' }
        }
        if (item.category_id) {
            var cate = await db.category.get(item.category_id) || {}
            item.category_name = cate.name
            item.category_title = cate.title
        }

        let pvinfo = await db.pv.get(item.id) 
        if (!pvinfo) {
            pvinfo = {id:item.id, pv:1}
            db.pv.add(pvinfo)
        } else {
            pvinfo.pv += 1;
            db.pv.update(pvinfo)
        }
        item.pv = pvinfo.pv;

        const next = await db.article.next(id, { des: true, query: { status: 1 } })
        const prev = await db.article.prev(id, { des: true, query: { status: 1 } })
        return { post: item, next, prev }
    },
    async query(ctx) {
        ctx.query.status = 1;
        return await manager.query(ctx)
    },
}