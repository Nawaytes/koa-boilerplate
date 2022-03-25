'use strict';

// tslint:disable:no-var-requires
const mt = require('mime-types');
const fs = require('fs');
const path = require('path');

const basePath = Symbol.for('project base path');

export class KoaPartial {
    constructor(projectPath) {
        this[basePath] = projectPath || process.cwd();
    }
    public isMedia(filePath) {
        const matches = filePath.match(/\.(mp3|mp4|flv|webm|ogv|mpg|wav|ogg|mov)$/ig);
        return !!matches;
    }
    public writeFileStream(ctx, start, end, filePath, stat) {

        return new Promise((resolve, reject) => {
            let stream = void 0;
            if (!this.isMedia(filePath)) {
                const err = new Error('This path is not a media');
                reject(err);
                return false;
            }
            if (stat.isFile()) {
                stream = fs.createReadStream(filePath, {start, end});
                stream.on('open', (length) => {
                    stream.pipe(ctx.res);
                });
                stream.on('error', (err) => {
                    reject(err);
                });
                stream.on('end', () => {
                    resolve('success');
                });
            } else {
                const err = new Error('This path is not a filepath');
                reject(err);
            }
        });
    }
    public async sendResponse(ctx) {
        const absolutePath = path.join(this[basePath], ctx.path);
        let stat = void 0;
        try {
            stat = fs.statSync(absolutePath);
        } catch (e) {
            throw new Error(`${absolutePath} file not exists`);
        }
        const range = ctx.request.header.range || 'bytes=0-';
        const bytes = range.split('=').pop().split('-');
        const fileStart = Number(bytes[0]);
        const fileEnd = Number(bytes[1]) || stat.size - 1;
        const contentType = mt.lookup(ctx.path);
        ctx.type = contentType;
        ctx.set('Accept-Ranges', 'bytes');
        if (fileEnd > stat.size - 1 || fileStart > stat.size - 1) {
            ctx.status = 416;
            ctx.set('Content-Range', `bytes ${stat.size}`);
            ctx.body = 'Requested Range Not Satisfiable';
        } else {
            ctx.status = 206;
            ctx.set('Content-Range', `bytes ${fileStart}-${fileEnd}/${stat.size}`);
            try {
                await this.writeFileStream(ctx, fileStart, fileEnd, absolutePath, stat);
            } catch (e) {
                throw new Error(e);
            }
        }
    }
    public middleware() {
        const dispatch = async (ctx, next) => {
            try {
                await this.sendResponse(ctx);
            } catch (e) {
                throw new Error(e);
            }
        };
        return dispatch;
    }
}
