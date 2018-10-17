const mgr = require('../../model/index').tag
module.exports = {
    async add(ctx) {
        const item = await mgr.find('name', ctx.query.name)
        if (item) return { error: 'tag exists' }
        const id = await mgr.add({ name: ctx.query.name})
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
        return await mgr.get(ctx.query.id)
    },
    async query(ctx) {
        return await mgr.query({ limit: ctx.query.cursor, des: true })
    },
}