import * as fs from 'fs'

export default function initializeScheduler() {
    const modules = fs
        .readdirSync(__dirname)
        .filter((file) => /\.(ts|js)$/.test(file)) // Include both .ts and .js files
        .filter((file) => file !== 'index.ts' && file !== 'index.js') // Exclude 'index.ts' and 'index.js'
        .map((file) => file.replace(/\.(ts|js)$/, ''))

    modules.map((module) => {
        const moduleController = require(`${__dirname}/${module}`).default
        const controller = new moduleController()
    })
}
