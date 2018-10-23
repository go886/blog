const db = require('../../model/index')
const mgr = db.article
const category = db.category
const idx = db.idx
const ex = require('./example')
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
        await idx.sub(cate.name).add({ id, key: post._k, title: post.title })
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
        var cate = await category.get(item.category_id) || {}
        item.category_name = cate.name
        item.category_title = cate.title
        return item
    },
    async query(ctx) {
        const category_name = ctx.query.cate;
        if (category_name) {
            const source = idx.sub(category_name)
            const pageSize = parseInt(ctx.query.pageSize || 10)
            const page = parseInt(ctx.query.page || 1)
            const total = await source.count()
            const array = await source.query({ pageSize, page, des: true })

            let list = []
            if (array && array.length > 0) {
                for (var i = 0; i < array.length; ++i) {
                    const item = await mgr.get(array[i].key)
                    if (item) {
                        var cate = await category.get(item.category_id)
                        if (cate) {
                            item.category_name = cate.name
                            item.category_title = cate.title
                        }

                        list.push(item)
                    }
                }
            }
            return { list, page, total }
        }

        const pageSize = parseInt(ctx.query.pageSize || 10)
        const page = parseInt(ctx.query.page || 1)
        const total = await mgr.count()
        const list = await mgr.query({ pageSize, page, des: true })
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