const mgr = require('../../model/index')
const ex = require('./example')

module.exports = {
    user: require('./user'),
    cate: require('./category'),
    article: require('./article'),
    link: require('./links'),
}

var item = mgr.category.add({name:'net', title:'网络'})
var item2 = mgr.category.add({name:'block', title:'区块链'})

