const manager = require('./manager').posts

module.exports = {
   
    async get(ctx) {
        return await manager.get(ctx)
    },
    async query(ctx) {
        return await manager.query(ctx)
    },
}