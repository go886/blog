const db = require('./db')
const Hashids = require('hashids');
const hashids = new Hashids('xiami.com', 0, 'abcdefghijklmnopqrstuvwxyz');

function model(name) {
    this.name = name
    return this;
}

model.prototype = {
    key(id) {
        return [this.name, id].join('.')
    },
    encode(id) {
        return hashids.encode(id)
    },
    decode(id) {
        return hashids.decode(id)
    },
    sub(name) {
        return new model([this.name, name].join('.'));
    },
    async add(o) {
        o.add_time = (new Date).getTime()
        o.edit_time = o.add_time
        const id = o.add_time
        o.id = this.encode(id)
        return (await (db.put(this.key(id), JSON.stringify(o)))) ? null : o.id
    },
    async remove(id) {
        return (await db.del(this.key(this.decode(id))) ? null : id)
    },
    async update(o) {
        o = JSON.parse(JSON.stringify(o))
        o.edit_time = (new Date).getTime()
        return (await (db.put(this.key(this.decode(o.id)), JSON.stringify(o)))) ? null : o.id
    },
    async get(id) {
        try {
            return JSON.parse(await db.get(this.key(this.decode(id))))
        } catch (error) {
            return null;
        }
    },
    async find(key, value) {
        const result = await this.query();
        if (result && result.list) {
            for (var i = 0; i < result.list.length; ++i) {
                const item = result.list[i]
                if (item[key] == value) {
                    return item;
                }
            }
        }
    },
    /**
     * {
     * limit:20,
     * cursor,
     * des
     * }
     * @param {Object} op 
     */
    async query(op = {}) {
        if (op.cursor) op.cursor = this.decode(op.cursor)
        const prefix = this.name + '.'
        const prefix_end = prefix.substring(0, prefix.length - 1)
            + String.fromCharCode(prefix[prefix.length - 1].charCodeAt() + 1)
        let options = {
            limit: (op.limit || 10) + 1,
            gte: this.key(op.cursor ? op.cursor : ''),
            reverse: op.des == true ? true : false,
            start: op.des == true ? prefix_end : prefix,
            end: op.des == true ? prefix : prefix_end,
        }
        return new Promise((resolve, reject) => {
            var list = []
            db.createReadStream(options)
                .on('data', (data) => {
                    let item = JSON.parse(data.value)
                    if (item) list.push(item)
                })
                .on('error', function (err) {
                    reject(err)
                })
                .on('close', function () {
                })
                .on('end', function () {
                    if (list.length > (op.limit || 10)) {
                        var last = list.pop()
                        resolve({ list, next: last.id })
                    } else {
                        resolve({ list })
                    }
                });
        });
    },

    async view() {
        return new Promise((resolve, reject) => {
            var list = []
            db.createReadStream()
                .on('data', (data) => {
                    data.value = JSON.parse(data.value)
                    list.push(data)
                })
                .on('error', function (err) {
                    reject(err)
                })
                .on('close', function () {
                })
                .on('end', function () {
                    resolve({ list })
                });
        });
    }
}

module.exports = {
    post: new model('p', true), //post
    category: new model('c'),
    user: new model('u'),
    link: new model('l'),
    tag: new model('t'),
    categoryPosts: new model('cp')
}