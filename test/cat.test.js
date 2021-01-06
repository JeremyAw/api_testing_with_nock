const nockBack = require('nock').back
// Specify fixture directory and mode to use
nockBack.fixtures = __dirname + '/fixtures'
nockBack.setMode('record')

// Configure Axios to use the Node adapter
// References: https://github.com/nock/nock#common-issues
const axios = require('axios')
axios.defaults.adapter = require('axios/lib/adapters/http')

// Set up chai plugin
const chai = require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp)

// Use 'expect' assertion style
const { expect } = require('chai')

nockBack('catFactsFixture.json', async (nockDone) => {
  // Record the fixture
  await axios.get('https://cat-fact.herokuapp.com/facts/random')
  nockDone()

  // Use the recorded fixture for tests
  nockBack('catFactsFixture.json', (nockDone) => {
    describe('Cat Facts API Testing', () => {
      const host = 'https://cat-fact.herokuapp.com'

      describe('GET /facts/random', () => {
        it('should return a random cat fact', (done) => {
          const path = '/facts/random'

          chai.request(host)
            .get(path)
            .end((err, res) => {
              expect(res.body.text).to.equal('A cat can die from essential oils')
              expect(res).to.have.status(200)
              done()
            })
        })
      })
    })
    
    nockDone()
  })
})