const mgr = require('../../model/index')
const ex = require('./example')

module.exports = {
    user: require('./user'),
    cate: require('./category'),
    article: require('./article'),
    link: require('./links'),
    setting: require('./setting'),
}

module.exports.cate.add({body:{query:{name:'net', title:'网络'}}})
module.exports.cate.add({body:{query:{name:'block', title:'区块链'}}})

