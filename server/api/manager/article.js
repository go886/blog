const db = require('../../model/index')
const mgr = db.article
const category = db.category


module.exports = {
    async add(ctx) {
        let post = ctx.query
        if (!(post.title && post.category_id && post.content && post.summary)) {
            return { error: "内容错误" }
        }
        var cate = await category.get(post.category_id)
        if (!cate) {
            return { error: "无效的分类" }
        }
        post.category_id = cate.id
        post.status = 0
        const id = await mgr.add(post)
        return { id }
    },
    async remove(ctx) {
        await mgr.remove(ctx.query.id)
        return { id: ctx.query.id }
    },
    async update(ctx) {
        let id = await mgr.update(ctx.query)
        return { id }
    },
    async get(ctx) {
        const item = await mgr.get(ctx.query.id)
        var cate = await category.get(item.category_id) || {}
        item.category_name = cate.name
        item.category_title = cate.title
        return item
    },
    async query(ctx) {
        const pageSize = parseInt(ctx.query.pageSize || 10)
        const page = parseInt(ctx.query.page || 1)

        let category_id = null
        if (ctx.query.cate) {
            const cate = await category.findOne({ name: ctx.query.cate })
            category_id = (cate || {}).id
        }

        const query = {
            status: ctx.query.status,
            category_id,
            tag: ctx.query.tag,
        }

        const r = await mgr.search({ page, limit: pageSize, des: true, query })
        if (r.list && r.list.length > 0) {
            for (var i = 0; i < r.list.length; ++i) {
                var item = r.list[i]
                var cate = await category.get(item.category_id)
                var pvinfo = await db.pv.get(item.id)
                if (pvinfo) {
                    item.pv = pvinfo.pv;
                } else {
                    item.pv = 0;
                }

                if (cate) {
                    item.category_name = cate.name
                    item.category_title = cate.title
                }
            }
        }
        return r;
    },
    async view(ctx) {
        return await mgr.view();
    },
    async first(ctx) {
        return await mgr.first()
    },
    async last(ctx) {
        return await mgr.last()
    },
    async next(ctx) {
        return await mgr.next(ctx.query.id)
    },
    async prev(ctx) {
        return await mgr.prev(ctx.query.id);
    },
    async count(ctx) {
        return await mgr.count();
    },
    async publish(ctx) {
        const id = ctx.query.id
        const status = ctx.query.publish == 'true' ? 1 : 0;
        const article = await mgr.get(id)
        if (article && article.status != status) {
            await mgr.update({ id: article.id, status })
            return { id }
        }
        return { error: 'op error' }
    },
    async search(ctx) {
        var op = {
            query: ctx.query,
        }

        return await mgr.search(op)
    }
}