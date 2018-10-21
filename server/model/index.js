const level = require('level')
const Hashids = require('hashids');
const hashids = new Hashids('xiami.com', 0, 'abcdefghijklmnopqrstuvwxyz');
const db = level('./mydb')
const INIT_INDEX = 1000000000000;


function model(name, usekey = false) {
    this.name = name
    this.id = INIT_INDEX;
    this.usekey = usekey
    return this;
}

model.prototype = {
    key(id) {
        return [this.name, id].join('.')
    },
    sub(name) {
        return new model([this.name, name].join('.'));
    },
    async add(o) {
        if (!o.id) {
            if (this.id == INIT_INDEX) {
                const last = await this.last()
                if (last && last.id) {
                    this.id = last.id
                }
            }
            this.id += 1;
            o.id = this.id
        }
        o.add_time = (new Date).getTime()
        o.edit_time = o.add_time
        // o.id = o.add_time
        if (this.usekey) o._k = hashids.encode(o.id)

        return (await (db.put(this.key(o.id), JSON.stringify(o)))) ? null : o.id
    },
    async remove(id) {
        return (await db.del(this.key(id)) ? null : id)
    },
    async update(o) {
        o = JSON.parse(JSON.stringify(o))
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
    async next(id, des = false) {
        const list = await this.query({
            limit: 1,
            cursor: id,
            next: true,
            des: des,
            equalself: false,
        })
        return list.length > 0 ? list[0] : null
    },
    async prev(id, des = false) {
        const list = await this.query({
            limit: 1,
            cursor: id,
            next: false,
            des: des,
            equalself: false,
        })
        return list.length > 0 ? list[0] : null
    },
    async first(des = false) {
        return await this.next(null, des)
    },
    async last(des = false) {
        return await this.first(!des)
    },
    async count() {
        const list = await this.query({ onlykey: true })
        return list.length
    },
    async find(key, value) {
        const list = await this.query();
        if (list) {
            for (var i = 0; i < list.length; ++i) {
                const item = list[i]
                if (item[key] == value) {
                    return item;
                }
            }
        }
    },
    /**
     * {
     * limit:20,
     * page:0,
     * pageSize:10,
     * cursor,
     * next:true
     * des
     * onlykey
     * equalself:true
     * }
     * @param {Object} op 
     */
    async query(op = {}) {
        const prefix = this.name + '.'
        const prefix_end = prefix.substring(0, prefix.length - 1)
            + String.fromCharCode(prefix[prefix.length - 1].charCodeAt() + 1)
        let options = {
            limit: (op.limit || 100000),
            reverse: (op.des == true),
            start: prefix,
            end: prefix_end,
            values: !(op.onlykey == true)
        }
        if (options.reverse == true) {
            options.start = prefix_end
            options.end = prefix
        }
        if (op.page) { //page size 模式
            options.limit = null;

        } else if (op.cursor) {
            const cursor = this.key(op.cursor)
            const next = (op.next !== false) && (options.reverse !== true)
            const equal = (op.equalself !== false)
            if (next) {
                equal ? options.gte = cursor : options.gt = cursor;
            } else {
                equal ? options.lte = cursor : options.lt = cursor
            }
        }
        return new Promise((resolve, reject) => {
            let list = []
            let i = 0;
            const begin = (parseInt(op.page) - 1) * parseInt(options.pageSize || 10)
            const end = (parseInt(op.page)) * parseInt(options.pageSize || 10)
            db.createReadStream(options)
                .on('data', (data) => {
                    ++i;

                    if (op.page) {
                        if (i >= begin && i < end) {
                            if (options.values == false) {
                                list.push(data.key)
                            } else {
                                let item = JSON.parse(data.value)
                                if (item) {
                                    list.push(item)
                                }
                            }
                        }
                    } else {
                        if (options.values == false) {
                            list.push(data.key)
                        } else {
                            let item = JSON.parse(data.value)
                            if (item) {
                                list.push(item)
                            }
                        }
                    }

                })
                .on('error', function (err) {
                    reject(err)
                })
                .on('close', function () {
                })
                .on('end', function () {
                    resolve(list)
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
    idx: new model(''), //indexs
    article: new model('a', true), //article
    category: new model('c'),
    user: new model('u'),
    link: new model('l'),
    tag: new model('t'),
    setting: new model('s'),
}