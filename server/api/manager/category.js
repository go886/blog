const mgr = require('../../model/index').category
module.exports = {
    async add(ctx) {
        const query = ctx.body.query
        const item = await mgr.findOne({'name': query.name})
        if (item) return { error: 'cateory exists' }

        const id = await mgr.add({name:query.name, title:query.title})
        return { id }
    },
    async remove(ctx) {
        return { id: await mgr.remove(ctx.body.query.id) }
    },
    async update(ctx) {
        let id = await mgr.update(ctx.body.query)
        return { id }
    },
    async get(ctx) {
        return await mgr.get(ctx.body.query.id)
    },
    async query(ctx) {
        return await mgr.search()
    },
}