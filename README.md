## **API Testing with Nock**

This repository is used to try out API testing using `nock`, `mocha`, `chai` and `chai-http`. 

The test server will be set up using `express`.

## **Setting Up**

- Just run `npm install` if you're cloning this repository along with the `package.json` file
- The instructions below are for starting from scratch

### **Initialize the repository**

Install nodejs and npm\
`sudo apt install nodejs`

If npm wasn't installed along with nodejs, install it manually\
`sudo apt install npm` 

Create package.json file\
`npm init`

Create .gitignore file\
`touch .gitignore`

Install express\
`npm install express`

### **Install testing dependencies**

Install nock, mocha, chai, chai-http\
`npm install --save-dev nock mocha chai chai-http`

Modify test script in package.json
```
"scripts": {
    "test": "mocha"
  },
```

## Mocking HTTP requests using nock for API testing

