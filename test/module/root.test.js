// require the Koa server

// const server = require("../src").default;
const http = require('http');
const app = require("../../src/app").default;
const server = http.createServer(app.callback());

// require supertest
const request = require("supertest").agent(server);
// close the sserver after each test
// afterAll((done) => {
//   server.close(done);
// });

describe("routes: index", () => {
    test("should respond as expected", async () => {
        const response = await request.get("/");
        expect(response.status).toEqual(200);
        expect(response.type).toEqual("application/json");
        expect(response.body.message).toEqual("API is running");
        console.log(response.end, 'response.end');
    });

    afterAll((done) => {
        server.close(done);
    });
});
