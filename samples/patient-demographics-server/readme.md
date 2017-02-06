#Server Stuff
###Note:
Please do not use, still using dummy data.

###Things Done
* Data model
* REST Setup (Dropwizard & Guice)
* Postgres Setup
* Liquibase Migration Setup
* Can be tested with Postman

###Things to do (not in order)
* Deploy and setup on Heroku
* Wire CRUD operations
* Write out liquibase changesets
* Unit Tests
  * Think about how to do it with Daos
* Write a proper ```readme.md```
  * Local setup vs Heroku
  * Deploy steps
  * Don't forget to document endpoints and operations (check checklist [here](https://github.com/GoTeamEpsilon/angular-to-react/issues/59) )
* Document tests and setup, eg. when using Postman, etc.
  * Don't forget about the build setup too, make sure to document what environment variables you are using.
* Sleep normal hours
  * Maybe consider adjusting 1 hour per day, backwards, not forward like usual. jokeslol

###Things to think about
* Is it still worth it to execute this in both Spring and Dropwizard?
* Try not to ask too many nonsequitor questions...
* What is adequate amounts of commenting and documentation?
* Something something security, definitely don't forget about that

###Endpoints

ContactResource
```
    GET     /contacts 
    POST    /contacts 
    PUT     /contacts 
    GET     /contacts/for-patient/{pid}
    DELETE  /contacts/{id} 
    GET     /contacts/{id}
 ```
 
 PatientResource
 ```
    GET     /patients
    POST    /patients 
    PUT     /patients 
    DELETE  /patients/{pid} 
    GET     /patients/{pid} 
 ```
