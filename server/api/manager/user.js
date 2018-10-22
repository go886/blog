const mgr = require('../../model/index').setting
const md5 = require('md5')
module.exports = {
    async update(ctx) {
        let user = await mgr.get("user")
        let newUser = {
            nick: ctx.query.nick,
            logo: ctx.query.logo,
            pwd: ctx.query.pwd ? md5(ctx.query.pwd) : null,
            newPwd: ctx.query.newpwd ? md5(ctx.query.newpwd) : null,
            newPwd2: ctx.query.newpwd2 ? md5(ctx.query.newpwd2) : null,
        }

        if (newUser.newPwd) {
            if (newUser.newPwd !== newUser.newPwd2) {
                return { error: '两次输入的密码不一致' }
            }
            if (!newUser.pwd) {
                return { error: '请输入原始密码' }
            }

            if (newUser.pwd == newUser.newPwd) {
                return { error: '新老不能密码一致' }
            }

            if (md5(newUser.pwd) !== user.pwd) {
                return { error: '原始密码不正确' }
            }

            user.pwd = newUser.newPwd
        }

        if (newUser.nick && newUser.nick.length > 0) {
            user.nick = newUser.nick
        }
        if (newUser.logo && newUser.logo.length > 0) {
            user.logo = newUser.logo
        }
        return await mgr.update(user)
    },
    async get(ctx) {
        let user = await mgr.get("user")
        if (user) delete user.pwd;
        return user
    },
    async login(ctx) {
        const name = ctx.query.name
        const pwd = ctx.query.pwd
        if (!name || !pwd) {
            return { error: '用户名与密码不能为空' }
        }
        let user = { name, pwd: md5(pwd) }
        let user2 = await mgr.get("user")
        if (!user2) { //第一次登录
            user.id = 'user'
            user.nick = 'admin'
            user.logo = 'https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1540180801&di=8266b89b06c96a7f94333a6fe217c8dd&src=http://bpic.588ku.com/element_origin_min_pic/01/31/87/96573b585a7c9c4.jpg'
            if (await mgr.update(user)) {
                //cookie
                ctx.session.token = await this.token()
                return { succeed: true }
            }
        } else {
            if (user.name !== user2.name || user.pwd != user2.pwd) {
                return { error: '用户名或密码错误', succeed: false }
            } else {
                if (await mgr.update(user2)) {
                    //cookie
                    ctx.session.token = await this.token()
                    return { succeed: true }
                }
            }
        }
        return { error: '未知错误' }
    },
    async token() {
        const user = await mgr.get("user")||{}
        const token = {
            name: user.name,
            pwd: md5(user.pwd + user.name)
        }
        return md5(JSON.stringify(token))
    }
}