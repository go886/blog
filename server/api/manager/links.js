const mgr = require('../../model/index').link
module.exports = {
    async add(ctx) {
        const item = await mgr.find('url', ctx.query.url)
        if (item) return { error: 'url exists' }
        const id = await mgr.add({ name: ctx.query.name, url: ctx.query.url })
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