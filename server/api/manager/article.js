const db = require('../../model/index')
const mgr = db.article
const category = db.category
const idx = db.idx
const ex = require('./example')
module.exports = {
    async add(ctx) {
        var article = JSON.parse(JSON.stringify(ex.article))
        var cate = await category.find('name', 'net') || {}
        article.category_id = cate.id
        article.category_name = cate.name

        article.title = ctx.query.title || "test"

        const id = await mgr.add(article)
        await idx.sub(cate.name).add({ id, title: article.title })
        return { id }
    },
    async remove(ctx) {
        let article = await mgr.get(ctx.query.id)
        if (!article) return { error: 'error post id' }

        await idx.sub(article.category_name).remove(article.id)
        await mgr.remove(article.id)
        return { id: article.id }
    },
    async update(ctx) {
        let item = await mgr.get(ctx.query.id)
        ctx.query && Object.keys(ctx.query).forEach(k => {
            if (['id', '_k', 'add_time', 'edit_time'].indexOf(k) == -1) {
                item[k] = ctx.query[k]
            }
        })
        let id = await mgr.update(item)
        return { id }
    },
    async get(ctx) {
        const item = await mgr.get(ctx.query.id)
        var cate = await category.get(item.category_id)
        item.category_name = cate.name
        item.category_title = cate.title
        return item
    },
    async query(ctx) {
        const pageSize = parseInt(ctx.query.pageSize || 10)
        const page = parseInt(ctx.query.page || 1)
        const total = await mgr.count()
        const list = await mgr.query({ limit: pageSize, page, des: true })
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
            article.status = status
            await mgr.update(article)
            return { id }
        }
        return { error: 'op error' }
    }
}