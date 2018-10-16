const mgr = require('../model/index').post
const category = require('../model/index').category
const ex = require('./example')
module.exports = {
    async add(ctx) {
        const id = await mgr.add(JSON.parse(JSON.stringify(ex.post)))
        return { id }
    },
    async remove(ctx) {
        let item = await mgr.get(ctx.params.id)
        item.status = 2
        let id = await mgr.update(item)
        return { id }
    },
    async update(ctx) {
        let item = await mgr.get(ctx.params.id)
        ctx.params && Object.keys(ctx.params).forEach(k => {
            if (item[k] && k !== 'id' && k !== 'add_time' && k !== 'edit_time') {
                item[k] = ctx.params[k]
            }
        })
        let id = await mgr.update(item)
        return { id }
    },
    async get(ctx) {
        const item = await mgr.get(ctx.params.id)
        var cate = await category.get(item.category_id)
        item.category_name = cate.name
        return item
    },
    async query(ctx) {
        const list = await mgr.query(ctx.query.next)
        for (var i = 0; i < list.list.length; ++i) {
            var item = list.list[i]
            var cate = await category.get(item.category_id)
            item.category_name = cate.name
        }
        return list
    },
}