import app     from 'src/server'
import request from 'supertest'

describe('express-service', () => {
  describe('GET /:greeting/:name', () => {
    it('should work', done =>
      request(app).get('/hello/world')
        .expect('Content-Type', /text/)
        .expect(res => res.body === 'hello, world!')
        .expect(200, done)
      )
  })
})
