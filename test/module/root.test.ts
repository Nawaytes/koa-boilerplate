import { request } from '../../src/helper/server_test'

describe('test test', () => {
    it('should pass', () => {
        expect(true).toBe(true)
    })
})

describe('routes: index', () => {
    test('should respond as expected', async () => {
        const response = await request.get('/')
        expect(response.status).toEqual(200)
        expect(response.type).toEqual('application/json')
        expect(response.body.message).toEqual('API is running')
    })
})
