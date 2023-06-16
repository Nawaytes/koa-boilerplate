import * as fs from 'fs'
import * as path from 'path'

export default function initializeModules(router) {
    const modules = fs
        .readdirSync(__dirname)
        .filter((file) => /\.(ts|js)$/.test(file)) // Include both .ts and .js files
        .filter((file) => file !== 'index.ts' && file !== 'index.js') // Exclude 'index.ts' and 'index.js'
        .map((file) => path.parse(file).name)

    modules.map((module) => {
        const moduleController = require(`${__dirname}/${module}`).default
        const controller = new moduleController()

        router.use(
            controller.__routeName || '',
            controller.__router.routes(),
            controller.__router.allowedMethods()
        )
    })
}
