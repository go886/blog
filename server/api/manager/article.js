const db = require('../../model/index')
const mgr = db.article
const category = db.category


module.exports = {
    async addIndexing(post) {
        await db.idx.cate.sub(post.category_name).add({ id: post.id, key: post._k, title: post.title })
        if (post.status == 1) {
            await db.idx.publish.add({ id: post.id, key: post._k, title: post.title })
            await db.idx.pcate.sub(post.category_name).add({ id: post.id, key: post._k, title: post.title })
        }
    },
    async removeIndexing(post) {
        await db.idx.cate.sub(post.category_name).remove(post.id)
        await db.idx.publish.remove(post.id)
        await db.idx.pcate.sub(post.category_name).remove(post.id)
    },

    async rebuildIndexing(post) {
        await this.removeIndexing(post)
        await this.addIndexing(post)
    },

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
        await this.addIndexing(post)
        return { id }
    },
    async remove(ctx) {
        let article = await mgr.get(ctx.query.id)
        if (!article) return { error: 'error post id' }

        await mgr.remove(article.id)
        await this.removeIndexing(article)
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
        await this.rebuildIndexing(item)
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
        const tag = ctx.query.tag;
        const pageSize = parseInt(ctx.query.pageSize || 10)
        const page = parseInt(ctx.query.page || 1)
        const status = parseInt(ctx.query.status || '-1')
        const is_publish = status == 1;

        let source = null
        if (category_name) {
            source = is_publish ? db.idx.pcate.sub(category_name) : db.idx.cate.sub(category_name)
        } else if (tag) {
            source = is_publish ? db.idx.ptag.sub(tag) : db.idx.tag.sub(tag)
        } else if (is_publish) {
            source = db.idx.publish
        }
        if (source) {
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
            await this.rebuildIndexing(article)
            return { id }
        }
        return { error: 'op error' }
    }
}