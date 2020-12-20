const nock = require('nock')

// Set up chai plugin
const chai = require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp)

// Use 'expect' assertion style
const { expect } = require('chai')

const host = 'http://localhost:3000'

describe('Server API Testing', () => {
  describe('GET /', () => {
    before(() => {
      nock(host)
      .get('/')
      .reply(200, 'This is some fake data sent by the nock interceptor.')
    })

    it('should get a welcome message', (done) => {
      const path = '/'
      chai.request(host)
          .get(path)
          .end((err, res) => {
            expect(res.text).to.equal('This is some fake data sent by the nock interceptor.')
            expect(res).to.have.status(200)
            done()
          })
    })
  })

  describe('POST /users', () => {
    before(() => {
      nock(host)
      .post('/users', { firstName: "John", lastName: "Doe" })
      .reply(201, { firstName: "John", lastName: "Doe" })
    })
    
    it('should return first name and last name', (done) => {
      const path = '/users'
      chai.request(host)
          .post(path)
          .set('Content-Type', 'application/json')
          .send({ firstName: "John", lastName: "Doe" })
          .end((err, res) => {
            expect(res.body).to.deep.equal({ firstName: "John", lastName: "Doe" })
            expect(res).to.have.status(201)
            done()
          })
    })
  })
})