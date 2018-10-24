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
        post.category_name = cate.name
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

        let query = {}
        if (ctx.query.status) query.status = ctx.query.status;
        if (ctx.query.cate) query.category_name = ctx.query.cate;
        if (ctx.query.tag) query.tag = ctx.query.tag;

        const total = await mgr.count({ query })
        const list = await mgr.query({ pageSize, page, des: true, query })
        for (var i = 0; i < list.length; ++i) {
            var item = list[i]
            var cate = await category.get(item.category_id)
            if (cate) {
                item.category_name = cate.name
                item.category_title = cate.title
            }
        }
        return { list, page, total }
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
    async publish(ctx) {
        const id = ctx.query.id
        const status = ctx.query.publish == 'true' ? 1 : 0;
        const article = await mgr.get(id)
        if (article && article.status != status) {
            await mgr.update({id:article._k, status})
            return { id }
        }
        return { error: 'op error' }
    }
}