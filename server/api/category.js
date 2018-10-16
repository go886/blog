const mgr = require('../model/index').category
const ex = require('./example')
module.exports = {
    async add(ctx) {
        const item = await mgr.get(ctx.query.id)
        if (item) return { error: 'cateory exists' }

        const id = await mgr.add({id:ctx.query.id, name:ctx.query.name||ctx.query.id})
        return { id }
    },
    async remove(ctx) {
        let item = await mgr.get(ctx.params.id)
        if (!item) return { error: 'no find' }

        item.status = 2
        let id = await mgr.update(item)
        return { id }
    },
    async update(ctx) {
        let item = await mgr.get(ctx.params.id)
        if (!item) return { error: 'no find' }

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
        return {item}
    },
    async query(ctx) {
        const list = await mgr.query(ctx.query.next)
        return {list}
    },
}