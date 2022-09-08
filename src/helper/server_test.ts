import app from '../app'
import http from 'http'
import supertest from 'supertest'

const server = http.createServer(app.callback())
export const request = supertest.agent(server)
