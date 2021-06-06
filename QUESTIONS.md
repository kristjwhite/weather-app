### 1. Build a small automated test framework and write 4 automated tests for this endpoint basedon the functional requirements given by the product owner, including a test for the errorhandling if the postcode is invalid.  

Find attached in WeatherApp.zip the project with design decision with the README.md


### 2. Looking at the architectural diagram, explain how you would approach testing this weatherapp-api on an integration level. 
Based on the architecture diagram given I would look to create integration tests based on the expected behaviour of each of the interfaces of the weatherapp-api app:

* Calls to geolocation-api:
    * Given I have a valid existing postcode,
    * When I call the geolocation-api with a parameterised GET
    * Then I should receive a response with a longitude and latitude
    
    * Given I have a valid non-existing postcode,
    * When I call the geolocation-api with a parameterised GET
    * Then I should receive an error message with a relevant status-code
    
* Call to forecast-api:
    
    * Given I have a valid longitude and latitude,
    * When I call the forecast-api with a parameterised GET
    * Then I should receive a response that contains all the required fields

    * Given I have an invalid longitude and latitude,
    * When I call the forecast-api with a parameterised GET
    * Then I should receive an error message with a relevant status-code
    
* Depending on End to End and Unit test coverage you might also want to test the interface of the weatherapp-api itself using mocked responses from the geolocation-api and forecast-api:

    * Given I have a valid existing postcode,
    * When I call the weatherapp-api with a POST
    * Then I should receive a parsed JSON that contains all the required fields

    * Given I have a valid non-existing postcode,
    * When I call the weatherapp-api with a POST
    * Then I should receive an error message with a 433 status-code
    
    * Given I have a invalid postcode,
    * When I call the weatherapp-api with a POST
    * Then I should receive an error message with a specific error status-code

* Through this coverage you would be able to ensure that the contracts for all of the API's interfaces should be checked whenever a change is made, however this could be optimised based on the complete test coverage. For example if the business logic of the Postcode Checker is covered in unit testing, then testing for an invalid postcode would be a lower value test.

### 3. What other things might you be concerned with testing for this API? Are there anybugs/issues you noticed?

When testing this API there are a few other things I would highlight as things we should check:
* Performance, what is the expected service level agreement for a response from this service and should we investigate looking into things like cacheing to help with load and latency
* Security, it's always useful to create a threat model of any new architecture or service to ensure that there has been appropriate security analysis (for example using something like Rapid Threat Modelling)
* Observability, is the system easy to observe and monitor once deployed? Are there relevant Alarms and Metrics to inform the team of operational issue?
* Accessibility, whilst not directly user facing, is there anything this service needs to provide to help with accessibility for a client team?
* `This API has a single endpoint which makes two calls to external public API's.` - this highlights an external dependancy of the service, so we should design and test that the system fails gracefully if these endpoints fail for whatever reason.

### Bugs/Issues:
* `precipIntensity` and `precipProbability` seemed to always return a zero value, this was causing errors on the front end application as it wasn't correctly handling the 0 values.

* `There is a check on the weather-app-apifor the validity of the postcode sent inthe body, according to a regex,returning a specific error code` - ideally this requirement should specify what the specific error code is, from testing it seemed to be "435" but this should be decided and agreed upfront to ensure all clients are aware of what the status code stands for.