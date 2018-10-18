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
        post.lastId = lastId++

        const id = await mgr.add(post)
        await idx.sub(cate.name).add({ value: id })
        return { id }
    },
    async remove(ctx) {
        return { id: await mgr.remove(ctx.query.id) }
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
        const list = await mgr.query({ limit: ctx.query.cursor, des: true })
        for (var i = 0; i < list.list.length; ++i) {
            var item = list.list[i]
            var cate = await category.get(item.category_id)
            item.category_name = cate.name
            item.category_title = cate.title
        }
        return list
    },
    async view(ctx) {
        return await mgr.view();
    }
}