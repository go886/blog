const mgr = require('../../model/index').category
module.exports = {
    async add(ctx) {
        const item = await mgr.find('name', ctx.query.name)
        if (item) return { error: 'cateory exists' }

        const id = await mgr.add({name:ctx.query.name, title:ctx.query.title})
        return { id }
    },
    async remove(ctx) {
        return { id: await mgr.remove(ctx.query.id) }
    },
    async update(ctx) {
        let id = await mgr.update(ctx.query)
        return { id }
    },
    async get(ctx) {
        return await mgr.get(ctx.query.id)
    },
    async query(ctx) {
        return await mgr.query()
    },
}