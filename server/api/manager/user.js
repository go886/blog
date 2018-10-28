const mgr = require('../../model/index').setting
const md5 = require('md5')
module.exports = {
    async update(ctx) {
        const query = ctx.body.query
        let user = await mgr.get("user")
        let newUser = {
            nick: query.nick,
            logo: query.logo,
            pwd: query.pwd ? md5(query.pwd) : null,
            newPwd: query.newpwd ? md5(query.newpwd) : null,
            newPwd2: query.newpwd2 ? md5(query.newpwd2) : null,
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
        const query = ctx.body.query
        const name = query.name
        const pwd = query.pwd
        if (!name || !pwd) {
            return { error: '用户名与密码不能为空' }
        }
        let user = { name, pwd: md5(pwd) }
        let user2 = await mgr.get("user")
        if (!user2) { //第一次登录
            user.id = 'user'
            user.nick = 'admin'
            if (await mgr.add(user)) {
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