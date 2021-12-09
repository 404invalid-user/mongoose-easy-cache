module.exports.Cache = class {
    constructor(t, s) {
        this.cacheType = t
        this.cache = [];
        this.schema = s;
    }
    async loadAll() {
        if (!this.schema || this.schema == null || this.schema == undefined) {
            throw "Error: schema is undefined";
        }
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
        if (!this.schema || this.schema == null || this.schema == undefined) {
            throw "Error: schema is undefined";
        }
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
        if (!this.schema || this.schema == null || this.schema == undefined) {
            throw "Error: schema is undefined";
        }
        let currentFile;
        let foundInCache = false;
        for await (const file of this.catch) {
            for (const theShit in values) {
                if (file[theShit]) {
                    foundInCache = true;
                    currentFile = file;
                }
            }
        }
        if (foundInCache == false) {
            currentFile = await this.schema.findOne(values);
            if (currentFile != null) {
                this.catch.push(currentFile);
            }
        }
        return currentFile;
    }
    async update(values) {
        if (!this.schema || this.schema == null || this.schema == undefined) {
            throw "Error: schema is undefined";
        }
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
        if (!this.schema || this.schema == null || this.schema == undefined) {
            throw "Error: schema is undefined";
        }
        const out = await this.schema.create(v);
        this.cache.push(v);
        return out;
    }
}