const manager = require('./manager').article

module.exports = {
   
    async get(ctx) {
        return await manager.get(ctx)
    },
    async query(ctx) {
        ctx.query.status = 1;
        return await manager.query(ctx)
    },
}