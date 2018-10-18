const mgr = require('../../model/index')
const ex = require('./example')

module.exports = {
    user: require('./user'),
    cate: require('./category'),
    posts: require('./posts')
}

mgr.category.add({name:'net', title:'网络'})
// mgr.category.add({name:'block', title:'区块链'})

