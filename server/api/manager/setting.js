const mgr = require('../../model/index').setting
module.exports = {
    async update(ctx) {
        let setting = JSON.parse(JSON.stringify(ctx.query))
        setting.id = 'syssetting'
        let id = await mgr.update(setting)
        return { id }
    },
    async get(ctx) {
        return await mgr.get('syssetting') || {
            name: '我的博客',
            title: 'hello 2018',
            desc: 'c++/java ',
            keywords: '互联网|区块连',
            theme:'default',
        
        }
    },
}