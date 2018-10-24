const level = require('level')
const Hashids = require('hashids');
const hashids = new Hashids('xiami.com', 0, 'abcdefghijklmnopqrstuvwxyz');
const db = level('./mydb', { valueEncoding: "json" })
const INIT_INDEX = 1000000000000;
const SEP = '.'
const SEP_NEXT = String.fromCharCode(SEP[0].charCodeAt() + 1)



function model(name, props = null, usekey = false) {
    this.name = name
    this.id = INIT_INDEX;
    this.props = props;
    this.usekey = usekey;
    return this;
}

model.prototype = {
    key(id) {
        return [this.name, id].join(SEP)
    },
    sub(name, usekey = false) {
        return new model([this.name || '', name].join(SEP), usekey);
    },
    encode(id) {
        return this.usekey ? hashids.encode(id) : id;
    },
    decode(id) {
        return this.usekey ? hashids.decode(id) : id;
    },
    async buildIndexing(o) {
        if (this.props) {
            for (let i = 0; i < this.props.length; ++i) {
                var k = this.props[i]
                k = Array.isArray(k) ? k : [k]
                let v = {}
                k.forEach((key) => {
                    v[key] = o[key]
                });

                let keys = []
                Object.keys(v).sort().forEach(key => {
                    keys.push([key, v[key]].join(':'))
                });

                var prefixe_name = [SEP + this.name, keys.join(SEP_NEXT), o.id].join(SEP)
                await db.put(prefixe_name, { value: o.id })
            }
        }
    },
    async removeIndexing(o) {
        if (this.props) {
            for (let i = 0; i < this.props.length; ++i) {
                var k = this.props[i]
                k = Array.isArray(k) ? k : [k]
                let v = {}
                k.forEach((key) => {
                    v[key] = o[key]
                });

                let keys = []
                Object.keys(v).sort().forEach(key => {
                    keys.push([key, v[key]].join(':'))
                });

                var prefixe_name = [SEP + this.name, keys.join(SEP_NEXT), o.id].join(SEP)
                await db.del(prefixe_name)
            }
        }
    },
    async rebuildIndexing(o) {
        await this.removeIndexing(o)
        await this.buildIndexing(o)
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
        if (this.usekey) o._k = this.encode(o.id)

        await this.buildIndexing(o)
        return (await (db.put(this.key(o.id), o))) ? null : o.id
    },
    async remove(id) {
        if (this.props) {
            const item = await this.get(id)
            await this.removeIndexing(item)
        }
        return (await db.del(this.key(this.decode(id))) ? null : id)
    },
    async update(o) {
        if (o.id) {
            let item = await this.get(o.id)
            if (item) {
                await this.removeIndexing(item);
                o && Object.keys(o).forEach(k => {
                    if (['id', '_k', 'add_time', 'edit_time'].indexOf(k) == -1) {
                        item[k] = o[k]
                    }
                });

                item.edit_time = (new Date).getTime()
                await this.buildIndexing(item);
                return (await (db.put(this.key(item.id), item))) ? null : item.id

            }

        }
    },
    async get(id) {
        try {
            return await db.get(this.key(this.decode(id)))
        } catch (error) {
            return null;
        }
    },
    async next(id, op = {}) {
        op.cursor = id;
        op.equalself = false
        op.next = true
        if (!op.limit) op.limit = 1;
        const list = await this.query(op)
        return list.length > 0 ? list[0] : null
    },
    async prev(id, op = {}) {
        op.cursor = id;
        op.equalself = false
        op.next = false
        if (!op.limit) op.limit = 1;

        const list = await this.query(op)
        return list.length > 0 ? list[0] : null
    },
    async first(op = {}) {
        return await this.next(null, op)
    },
    async last(op = {}) {
        op.des = !op.des;
        return await this.first(op)
    },
    async count(op = {}) {
        op.onlykey = true
        const list = await this.query(op)
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
     * query:[
     * {status:0}
     * {category_name:'net'}
     * ]
     * }
     * @param {Object} op 
     */
    async _query(op = {}) {
        let prefixe_name = this.name
        if (op.query && Object.keys(op.query).length > 0) {
            var keys = []
            Object.keys(op.query).sort().forEach(k => {
                keys.push([k, op.query[k]].join(':'))
            });
            prefixe_name = [SEP + this.name, keys.join(SEP_NEXT)].join(SEP)
        }

        const prefix = prefixe_name + SEP;
        const prefix_end = prefixe_name + SEP_NEXT;
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
            const cursor = this.key(this.decode(op.cursor))
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
            const begin = (parseInt(op.page) - 1) * parseInt(op.pageSize || 10)
            const end = (parseInt(op.page)) * parseInt(op.pageSize || 10)
            db.createReadStream(options)
                .on('data', (data) => {
                    ++i;

                    let isvalid = true;
                    if (op.page) {
                        isvalid = ((i > begin && i <= end))
                    }

                    if (isvalid) {
                        if (options.values == false) {
                            list.push(data)
                        } else {
                            let item = data.value
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

    async query(op = {}) {
        let result = await this._query(op)
        if (op.query && !op.onlykey && Object.keys(op.query).length > 0) {
            let list = []
            for (var i = 0; i < result.length; ++i) {
                let item = await db.get(this.key((result[i] || {}).value))
                if (item) {
                    list.push(item)
                }
            }
            return list;
        }
        return result;
    },

    async view() {
        return new Promise((resolve, reject) => {
            var list = []
            db.createReadStream()
                .on('data', (data) => {
                    data.value = data.value
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
    // idx: new model(''), //indexs
    article: new model('a', ["category_name", "status", ["category_name", "status"]], true), //article
    category: new model('c'),
    user: new model('u'),
    link: new model('l'),
    tag: new model('t'),
    setting: new model('s'),
}