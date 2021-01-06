## **API Testing with Nock**

This repository is used to try out API testing using [`nock`](https://github.com/nock/nock), [`mocha`](https://mochajs.org/), [`chai`](https://www.chaijs.com/) and [`chai-http`](https://www.chaijs.com/plugins/chai-http/). 

The test server will be set up using [`express`](http://expressjs.com/).

## **Setting Up**

- Just run `npm install` if you're cloning this repository along with the `package.json` file
- The instructions below are for starting from scratch

### **Initialize the repository**

- Install nodejs and npm\
`sudo apt install nodejs`

- If npm wasn't installed along with nodejs, install it manually\
`sudo apt install npm` 

- Create package.json file\
`npm init`

- Create .gitignore file\
`touch .gitignore`

- Install express\
`npm install express`

### **Install testing dependencies**

- Install `nock`, `mocha`, `chai` and `chai-http`\
`npm install --save-dev nock mocha chai chai-http`

- Modify test script in `package.json`
```
"scripts": {
    "test": "mocha"
  },
```

## **Mocking HTTP requests using nock**

- For each `describe` block, create a nock interceptor for the http route that is being tested in the `before` hook 

```
describe('GET /route/to/be/tested', () => {
    before(() => {
      nock(host)
      .get('/route/to/be/tested')
      .reply(200, 'This is some fake data sent by the nock interceptor.')
    })

    it('should get do something', (done) => {
      // test something
      // call done() to signal callback end (only when using `chai-http`)
    })
  })
```
- Run `npm test` to execute the tests without a live server (duh, that's the whole point)

## **Recording fixtures**

- Nocks can become cumbersome to write, especially when they return different results with each call

- Fortunately, `nock` supports fixture recording and playback

- Set up the fixture directory and [mode]('https://github.com/nock/nock#modes') to use

```
const nockBack = require('nock').back

nockBack.fixtures = __dirname + '/fixtures'
nockBack.setMode('record')
```

- For each http request to record/test, pass in the desired file name for the recorded fixture, call the http request before finally using the recorded fixture to run the tests

- Take note to call `nockDone()` after recording the fixture and after completion of the tests

- You can use other packages such as `http` or `request` to make the http request as well

- Ensure that you pass in the same fixture file name for both `nockBack()` calls 

```
// Pass in desired file name for recorded fixture
nockBack('myFixture.json', async (nockDone) => {
  // Record the fixture
  await axios.get('https://some-random-website.com')
  nockDone()

  // Use the recorded fixture for tests
  nockBack('myFixture.json', (nockDone) => {
    describe('GET /route/to/be/tested', () => {
        // test something
        // call done() to signal callback end (only when using `chai-http`)
      })
    })
    nockDone()
  })
})
```