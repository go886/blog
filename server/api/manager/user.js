const mgr = require('../../model/index').user
const md5 = require('md5')
mgr.add({ name: 'admin', pwd: md5(md5('admin')) })
module.exports = {
    async add(ctx) {
        const user = await mgr.find('name', ctx.query.name)
        if (user) return { error: 'user exists' }
        const id = await mgr.add({ name: ctx.query.name, pwd: md5(ctx.query.pwd) })
        return { id }
    },
    async remove(ctx) {
        return { id: await mgr.remove(ctx.query.id) }
    },
    async update(ctx) {
        let item = await mgr.get(ctx.query.id)
        if (!item) return { error: 'user no find' }

        ctx.query && Object.keys(ctx.query).forEach(k => {
            if (item[k] && k !== 'id' && k !== 'add_time' && k !== 'edit_time') {
                item[k] = ctx.query[k]
            }
        })
        let id = await mgr.update(item)
        return { id }
    },
    async get(ctx) {
        let item = await mgr.get(ctx.query.id)
        delete item.pwd;
        return item
    },
    async query(ctx) {
        const info = await mgr.query()
        info && info.list && info.list.forEach(user=>{
            delete user.pwd;
        });
        return info
    },
    async login(ctx) {
        let user = {name:ctx.query.name, pwd:md5(ctx.query.pwd)}
        let user2 = await mgr.find('name', user.name)
        if (user2 && user.pwd == user2.pwd) {
            await mgr.update(user2)
            delete user2.pwd

            ctx.session.user = user.name
            return user2
        }
        return {error: '用户名或密码错误'}
    }
}