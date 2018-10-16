const db = require('./db')
const Hashids = require('hashids');
const hashids = new Hashids();

function model(name) {
    this.name = name
    return this;
}

model.prototype = {
    key(id) {
        return this.name + '_' + id
    },
    async add(o) {
        o.add_time = (new Date).getTime()
        o.edit_time = o.add_time
        if (!o.id) o.id = hashids.encode(o.add_time)
        return (await (db.put(this.key(o.id), JSON.stringify(o)))) ? null : o.id
    },
    async remove(id) {
        return await db.del(this.key(id))
    },
    async update(o) {
        o.edit_time = (new Date).getTime()
        return (await (db.put(this.key(o.id), JSON.stringify(o)))) ? null : o.id
    },
    async get(id) {
        try {
            return JSON.parse(await db.get(this.key(id)))
        } catch (error) {
            return null;
        }
    },
    async query(next, pagesize = 10) {
        return new Promise((resolve, reject) => {
            var list = []
            db.createReadStream({ limit: pagesize + 1, gte: this.key(next ? next : '') })
                .on('data', function (data) {
                    list.push(JSON.parse(data.value))
                })
                .on('error', function (err) {
                    reject(err)
                })
                .on('close', function () {
                })
                .on('end', function () {
                    if (list.length > pagesize) {
                        var last = list.pop()
                        resolve({ list, next: last.id })
                    } else {
                        resolve({ list })
                    }
                });
        });
    },
}

module.exports = {
    post: new model('post'),
    category: new model('category'),
    user: new model('user'),
}