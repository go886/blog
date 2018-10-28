const mgr = require('../../model/index').setting
module.exports = {
    async update(ctx) {
        let setting = JSON.parse(JSON.stringify(ctx.body.query))
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
            plugin_tracker:'var _hmt = _hmt || []; \
            (function() {\
              var hm = document.createElement("script"); \
              hm.src = "https://hm.baidu.com/hm.js?aa92d109cb6e0d52a672e26e4515c0a9";\
              var s = document.getElementsByTagName("script")[0]; \
              s.parentNode.insertBefore(hm, s);\
            })();',
            
        
        }
    },
}