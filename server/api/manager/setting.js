const mgr = require('../../model/index').setting
module.exports = {
    async update(ctx) {
        let setting = JSON.parse(JSON.stringify(ctx.query))
        setting.id = 'syssetting'
        let id = await mgr.add(setting)
        return { id }
    },
    async get(ctx) {
        return await mgr.get('syssetting') || {
            name: 'lege2005 blog',
            title: 'hello 2018',
            desc: 'c++/java ',
            keywords: '互联网|区块连',
            theme:'default',
        
        }
    },
}