const db = require('../../model/index')
const mgr = db.post
const category = db.category
const idx = db.idx
const ex = require('./example')
var lastId = 0;
module.exports = {
    async add(ctx) {
        var post = JSON.parse(JSON.stringify(ex.post))
        var cate = await category.find('name', 'net')
        post.category_id = cate.id
        post.category_name = cate.name
        post.lastId = lastId++

        const id = await mgr.add(post)
        await idx.sub(cate.name).add({ id, title: post.title })
        return { id }
    },
    async remove(ctx) {
        let post = await mgr.get(ctx.query.id)
        if (!post) return { error: 'error post id' }

        await idx.sub(post.category_name).remove(post.id)
        return { id: post.id }
    },
    async update(ctx) {
        let item = await mgr.get(ctx.query.id)
        ctx.query && Object.keys(ctx.query).forEach(k => {
            if (item[k] && k !== 'id' && k !== 'add_time' && k !== 'edit_time') {
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
        const pageSize = (ctx.query.pageSize || 10) + 1
        const list = await mgr.query({ limit: pageSize, cursor: ctx.query.cursor, des: true })
        for (var i = 0; i < list.length; ++i) {
            var item = list[i]
            var cate = await category.get(item.category_id)
            if (cate) {
                item.category_name = cate.name
                item.category_title = cate.title
            }
        }
        if (list.length >= pageSize) {
            return { list, cursor: list.pop() }
        }
        return { list, }
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
        const post = await mgr.get(id)
        if (post && post.status != status) {
            await mgr.update(post)
            return {id}
        } 
        return {error:'op error'}
    }
}