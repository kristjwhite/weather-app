# Setup and Run

### Installation:
Setup requires node and npm to be installed on the local machine

```
$ brew install node
```

Installation of required packages can be done by running, from the root of this package

```
$ npm i
```

### Running all tests:

To run all tests just run from root:

```
$ npm run test
```

### Decision Details

This package was written in Javascript using a simple framework using Supertest & Jest to call to the test endpoint. This was chosen for a few reasons:

- Jest is a commonly used tool for unit testing, and is fairly readable even for people who don't use it regularly or use other similar unit test packages (Mocha/Chai, Jasmine, etc.)

- Supertest is a fairly light weight and quick tool for implementing actual API calls

- Using common syntax and languages makes the framework easier to maintain as a team

- By using Supertest and Jest the test suite is also very easy to add to a CI/CD pipeline and cna be configured to run against a locally run server as well using something such as Express

From looking in the network console of `https://serene-mountain-14043.herokuapp.com/` it was clear to see that the frontend was calling `https://fierce-gorge-81903.herokuapp.com/api` for the weatherapp-api, which was a public endpoint.

Test coverage was broken down based on the three primary use cases, with a file for each:
* Valid existing postcode
* Valid non-existing postcode
* Invalid postcode
