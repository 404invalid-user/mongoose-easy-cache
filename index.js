module.exports.Cache = class {
    constructor(t, s) {
        if (!s || s == null || s == undefined) {
            throw "Error: schema is undefined";
        }
        this.cacheType = t;
        this.cache = [];
        this.schema = s;
    }
    async loadAll() {
        let l = this.cache.length;
        const toCache = await this.schema.find({});
        for await (const c of toCache) {
            this.cache.push(c)
        }
        return {
            size: this.cache.length,
            oldSize: l
        };
    }
    async reloadAll() {
        this.cache = [];
        const toCache = await this.schema.find({});
        for await (const c of toCache) {
            this.cache.push(c)
        }
        return this.cache.length;
    }
    getAll() {
        return this.cache;
    }

    async get(values) {
        let currentFile = null;
        let foundInCache = false;
        if (this.cache.length > 0) {
            for await (const file of this.cache) {
                for (const theShit in values) {
                    if (file[theShit] == values[theShit]) {
                        foundInCache = true;
                        currentFile = file;
                    }
                }
            }
        }
        if (foundInCache == false) {
            currentFile = await this.schema.findOne(values);
            if (currentFile != null) {
                this.cache.push(currentFile);
            } else {
                currentFile = null;
            }
        }
        return currentFile;
    }
    async update(values) {
        let currentFile;
        let updatedFile = await this.schema.findOne(values);
        let foundInCache = false;
        let pos = -1
        for (let i = 0; i < catchFiles.length; i++) {
            for (const theShit in values) {
                if (catchFiles[i][theShit]) {
                    foundInCache = true;
                    pos = i;
                }
            }
        }
        if (pos !== -1) {
            catchFiles[pos] = updatedFile;
        }
        return updatedFile;
    }
    async create(v) {
        const out = await this.schema.create(v);
        this.cache.push(v);
        return out;
    }
}
module.exports.CacheArray = class {
    constructor(t, s) {
        if (!s || s == null || s == undefined) {
            throw "Error: schema is undefined";
        }
        this.cacheType = t;
        this.cache = [];
        this.schema = s;
    }
    async loadAll() {
        let l = this.cache.length;
        const toCache = await this.schema.find({});
        for await (const c of toCache) {
            this.cache.push(c)
        }
        return {
            size: this.cache.length,
            oldSize: l
        };
    }
    async reloadAll() {
        this.cache = [];
        const toCache = await this.schema.find({});
        for await (const c of toCache) {
            this.cache.push(c)
        }
        return this.cache.length;
    }
    getAll() {
        return this.cache;
    }

    async get(values) {
        let currentFile = null;
        let foundInCache = false;
        if (this.cache.length > 0) {
            for await (const file of this.cache) {
                for (const theShit in values) {
                    if (file[theShit] == values[theShit]) {
                        foundInCache = true;
                        currentFile = file;
                    }
                }
            }
        }
        if (foundInCache == false) {
            currentFile = await this.schema.findOne(values);
            if (currentFile != null) {
                this.cache.push(currentFile);
            } else {
                currentFile = null;
            }
        }
        return currentFile;
    }
    async update(values) {
        let currentFile;
        let updatedFile = await this.schema.findOne(values);
        let foundInCache = false;
        let pos = -1
        for (let i = 0; i < catchFiles.length; i++) {
            for (const theShit in values) {
                if (catchFiles[i][theShit]) {
                    foundInCache = true;
                    pos = i;
                }
            }
        }
        if (pos !== -1) {
            catchFiles[pos] = updatedFile;
        }
        return updatedFile;
    }
    async create(v) {
        const out = await this.schema.create(v);
        this.cache.push(v);
        return out;
    }
}
