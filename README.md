[![Build Status](https://travis-ci.org/GoTeamEpsilon/angular-to-react-redux.svg?branch=master)](https://travis-ci.org/GoTeamEpsilon/angular-to-react-redux)

![img](http://i.imgur.com/Gq1eJpa.png)

This repository is an educational resource for Angular v1 experts that are looking to learn React/Redux. A contrived sample application for managing basic patient information is provided using both technologies' best practices (look under `samples/` to see both versions). This application (demonstrated below) will be referred to below as we explore the key philosophical differences between Angular v1 and React/Redux so that you can get coding!

![gif](https://i.imgur.com/TGUAuCF.gif)

Getting Started
===============

### 🔨 Scaffolding & Tooling

Once the technologies for a project are chosen, the next step is to figure out how to scaffold and build the application using production-ready practices. Angular v1 applications are typically wired together using a mixture of [NPM](https://www.npmjs.com/) and [Bower](https://bower.io/) (dependency management) and [Grunt](https://gruntjs.com/) or [Gulp](http://gulpjs.com/) (build tooling). In the React/Redux world, NPM and [Webpack](https://webpack.github.io/) are the way to go (this repo uses and recommends the [react-redux-starter-kit](https://github.com/davezuko/react-redux-starter-kit) which incorporates these technologies).

Scaffolding a project in React/Redux isn't very different from what is typically done in Angular v1 (with some exceptions to the [John Papa styleguide](https://github.com/johnpapa/angular-styleguide)). Here's the `tree` output of both samples in this repository:

```
                 Angular v1                                           React/Redux
                ------------                                         -------------
├── app.module.js                                      ├── common
├── common                                             │   ├── CustomValidators.js
│   ├── ssn.filter.js                                  │   ├── Formatters.js
│   └── tel.filter.js                                  │   ├── FormsyDatePicker.js
├── patient                                            │   ├── FormsyInput.js
│   ├── demographics                                   │   └── FormsyMaskedInput.js
│   │   ├── basic                                      ├── containers
│   │   │   ├── basic.info.controller.js               │   └── AppContainer.js
│   │   │   ├── basic.info.directive.js                ├── index.html
│   │   │   ├── basic.info.view.html                   ├── layouts
│   │   │   └── basic.module.js                        │   └── CoreLayout
│   │   ├── contact                                    │       ├── CoreLayout.js
│   │   │   ├── contact.info.controller.js             │       ├── CoreLayout.scss
│   │   │   ├── contact.info.directive.js              │       └── index.js
│   │   │   ├── contact.info.view.html                 ├── main.js
│   │   │   └── contact.module.js                      ├── routes
│   │   ├── demographics.controller.js                 │   ├── index.js
│   │   ├── demographics.directive.js                  │   └── Patient
│   │   ├── demographics.module.js                     │       ├── Demographics
│   │   └── demographics.view.html                     │       │   ├── Basic
│   ├── patient.controller.js                          │       │   │   └── BasicComponent.js
│   ├── patient.html                                   │       │   ├── Contact
│   ├── patient.module.js                              │       │   │   └── ContactComponent.js
│   └── patient.service.js                             │       │   │
└── index.html                                         │       │   ├── PatientDemographicsComponent.js
                                                       │       │   └── PatientDemographicsContainer.js
                                                       │       ├── index.js
                                                       │       └── PatientModule.js
                                                       ├── store
                                                       │   ├── createStore.js
                                                       │   ├── location.js
                                                       │   └── reducers.js
                                                       └── styles
                                                           ├── _base.scss
                                                           └── core.scss
```

Notice how everything is [organized in modules](https://medium.com/@scbarrus/the-ducks-file-structure-for-redux-d63c41b7035c#.ji6r2j61o) as opposed to a flat directory approach. This is a best practice that helps one organize a complex user interface while still sharing generic pieces.

Now that the file structure (hopefully) makes sense, one can go back a directory and run the build tool (you won't find major differences between gulp/grunt and webpack). In our case, it's `grunt serve` and `npm start` for Angular v1 and React/Redux samples, respectively.

### 🎛 Directives vs Components

The heart of Angular v1 is with directives. These discrete interfaces take in 1 and 2-way data parameters and inject services that really power up your view. Fortunately, directives are not that different from Redux-aware React components. Moreover, the stuff inside of React components can be easily translated from Angular v1 concepts (this repo won't go into those details, as they are easily "Googleable"... for instance Google _"React equivalent for ng-repeat"_ to see for yourself).

In Angular v1, directives are typically introduced in views that are controlled by route-level controllers. In React/Redux, components are introduced in the same way, however, a container must be placed in the middle so that the component (also known as a [smart component](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0#.htl1bug49), in this case) can get application-wide state. The container will also bring in functions from upper level services that child components will use. These topics (application-wide state and upper level services) will be explained later in the guide.

As mentioned before, Redux has to bind its store to child React components in a container. In our application, the `routes/Patient/Demographics/PatientDemographicsContainer.js` puts references to the Redux state like so (code simplified for sake of demonstration):

```jsx
const mapStateToProps = (state) => ({
  patientInContext: state.patient.patientInContext,
  basic: state.patient[state.patient.patientInContext].basic
  contacts: state.patient[state.patient.patientInContext].contact
})
```

One other important thing that is done in this container is the binding of Redux-aware service functions (formally known as "action creators") like so:

```jsx
const mapDispatchToProps = {
  setPatientInContext,
  updatePatientData,
  updateContactData,
  deleteContact,
  startAddingNewContact
}
```

With these two mappings out of the way, child components can access the state and functions from above. Here are some  highlighted examples of this in `routes/Patient/Demographics/Basic/BasicComponent.js`:

Displaying data from the store in a table:
```jsx
<tr>
  <td><strong>SSN:</strong> {socialSecurityFormat(this.props.info.ssn)}</td>
  <td><strong>Martial Status:</strong> {this.props.info.martialStatus}</td>
</tr>
```

Form edit reference to the SSN input (uses local component state instead of Redux store state - note that [Formsy](https://github.com/christianalfoni/formsy-react) is a popular form validation library):
```jsx
<td>
  <FormsyMaskedInput mask={[/\d/,/\d/,/\d/,'-',/\d/,/\d/,'-',/\d/,/\d/,/\d/,/\d/]}
                     value={this.state.ssn}
                     onChange={this.handleInputChange}
                     validations={{
                       isLength: 9
                     }}
                     sanitizationFunction={this.sanitizeToJustNumbers}
                     validationErrors={{
                       isDefaultRequiredValue: 'Valid SSN is required',
                       isLength: 'Valid SSN is required'
                     }}
                     name='ssn'
                     label='SSN'
                     required />
</td>
```

Save function for the form that takes the local component state of the form and sends it to the Redux store for updating. Note that `updatePatientData` is passed from the parent container:
```jsx
handleSubmit(formValues) {
  // Convert dob back to date string
  formValues.dob = formValues.dob.format('YYYY-MM-DD')
  this.props.updatePatientData(formValues)
  this.setState({ showForm: false })
}
```

At this point, you may be thinking _"wait, why are you copying the data from Redux into the local state/form rather than using it directly? Isn't the point of Redux to encapsulate _all_ application state?"_. Good question. As with most things in software engineering, it is always best to be able to break the rules when it's justified. Should state such as `{ showForm: true/false }` (determines whether to render the form or not) and `{ cachedForm: this.props.info }` (holds a cache of the form state if the user hits cancel) be put into the Redux store or just be local to the component? It depends. In our case, this state doesn't need to be application wide so Redux is only storing things that are domain-centric rather than domain-centric and UI-centric. These things will often come down to requirements and what the opinions are of your resident seasoned Redux enthusiast(s).

Service Layer
=============

### 🌿 Store

In Angular v1, application-wide state is put into services so that directive controllers can CRUD it. In React/Redux, all application-wide state is put into the store, an object tree. As shown in the above section, components access the store via containers and parent components passing it to them. Components can alter said state by invoking module functions (formally known as "action creators") that containers and parent components pass down.

One key difference between Angular v1 application-wide state in services and Redux store is that state mutation is not allowed. While this sounds weird and scary at first, you _can_ change this state but it must be done in a very specific way. The easiest way to think about this is whenever you update the store, you simply clone the object, mutate the clone to your heart's content, and send that to the store.

Think back to your Angular v1 directives that display information from a service that holds the state. When that service state changes, the directive will change the view to reflect said change. Similarly, Redux-aware React components will change when the store changes.

### ✨ Actions & Pure Reducers

A key difference between the updating of the state in an Angular v1 service and in the Redux store is that you don't "talk" to the store directly. In order to get the store to respond to data changes, you must issue an action. Actions simply send data from your application to your store and then your app "reacts" (pardon the pun).

Recall that the `routes/Patient/Demographics/Basic/BasicComponent.js` calls `this.props.updatePatientData(formValues)` when it wishes to update basic patient information in the store. The `updatePatientData` function is defined in the module `routes/Patient/PatientModule.js` (modules will be covered in the next section) that looks like this:

```jsx
export const updatePatientData = (data) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      console.debug(`updating basic patient data for ${getState().patient.patientInContext}`)
      dispatch({
        type    : 'UPDATE_PATIENT_DATA',
        payload : data
      })
      resolve()
    })
  }
}
```

The important piece to focus on for now is the `dispatch` function. This function takes in something called an action. In our case, our action is of type `UPDATE_PATIENT_DATA` and the payload is the new basic data.

When the action has been dispatched, something needs to handle it so that the store is updated. This is the job of the reducer. Reducers look at an inbound action and figure out how to update the store with the new information. For example `routes/Patient/PatientModule.js` exposes the following reducer:

```jsx
const initialState = testData
export default function patientReducer (state = initialState, action) {
  let result
  let copy
  switch (action.type) {
    case 'UPDATE_PATIENT_IN_CONTEXT':
      copy = clone(state)
      copy.patientInContext = action.payload
      result = copy
      break
    case 'UPDATE_PATIENT_DATA':
      copy = clone(state)
      copy[copy.patientInContext].basic = action.payload
      result = copy
      break
    case 'UPDATE_CONTACT_DATA':
      copy = clone(state)
      const contactIndexForUpdation = _.findIndex(copy[copy.patientInContext].contacts, (c) => {
        if (c && c.hasOwnProperty('id')) {
          return c.id === action.payload.id
        }
      })
      copy[copy.patientInContext].contacts[contactIndexForUpdation] = action.payload
      result = copy
      break
    case 'INSERT_CONTACT':
      copy = clone(state)
      const lastContact = _.last(copy[copy.patientInContext].contacts)
      let newContactId = 0
      if (lastContact != null && lastContact.hasOwnProperty('id')) {
        newContactId = lastContact.id + 1
      }
      copy[copy.patientInContext].contacts.push({ isNewContact: true, id: newContactId })
      result = copy
      break
    case 'DELETE_CONTACT':
      copy = clone(state)
      const contactIndexForDeletion = _.findIndex(copy[copy.patientInContext].contacts, (c) => {
        if (c && c.hasOwnProperty('id')) {
          return c.id === action.payload
        }
      })
      delete copy[copy.patientInContext].contacts[contactIndexForDeletion]
      result = copy
      break
    default:
      result = state
  }

  return result
}
```

There is a good amount going on here, but the most important thing to focus on is that `state` variable. This is the application store. Because we are `switch`ing on action types, the reducer will know to run the code in the `UPDATE_PATIENT_DATA` section. This code is simply making a copy of the store and editing it with the new basic information. At the end of the function `return result` is called and the Redux store is updated.

What's interesting is that the reducer is [pure](https://www.sitepoint.com/functional-programming-pure-functions/) in that no mutations were made to the original store because [clone](https://www.npmjs.com/package/clone) (a nice NPM module) copied the store to a new object.

### 🏭 Modules

In the last section, we learned that `routes/Patient/Demographics/Basic/BasicComponent.js` calls `this.props.updatePatientData(formValues)` which dispatches an action to the reducer so that the store can be updated. You may be thinking _"the module is just a place where actions are created and reducers run based on those actions"_. This is correct, but there is an additional piece worth pointing out. Modules can serve as a centralized place for logic to run before the store updates.

`routes/Patient/Demographics/Contact/ContactComponent.js` allows users to add a new contact. This data payload will eventually make it up to the module and the module may wish to perform an HTTP `POST` to a server (note that our sample application doesn't do this) before saving the new contact information to the store. This logic is totally appropriate for the module function and would look something like this:

```jsx
export const startAddingNewContact = (data) => {
  return (dispatch, getState) => {
    return HttpPost(endpoint, data)
      .then((response) => {
        data.id = response.data.id
        dispatch({
          type    : 'INSERT_CONTACT',
          payload : data
        })
      })
    })
  }
}
```

You may be thinking _"I see there's a mutation here (function is not pure)... `data` is getting an `id` added on, is that allowable?"_. The answer is "yes". Module functions can be asynchronous and have side effects. The important thing is that the reducer that will receive the action will be pure and synchronous.

Unit Testing
============

### 🔬 Frameworks & Philosophy

Unit testing is not too much different than the approaches found in Angular v1. [Karma](https://karma-runner.github.io/1.0/index.html), [Mocha](https://mochajs.org/), [Chai](http://chaijs.com/), and [Sinon](http://sinonjs.org/) are used as the test runner, framework, assertion library, and mocks/spies tools respectively.

The only philosophical difference that is notable is that tests assert items on the component view in React/Redux. This is typically not done in Angular v1 unit tests.

NOTE: `v1.0.0` Didn't include unit tests for the Redux/React sample application (embarrasing, right?). The Angular v1 sample tests are in place, but we plan on doing the Redux/React tests in `v1.0.1`.

Additional Resources
====================

- [React Component Lifecycle](http://busypeoples.github.io/post/react-component-lifecycle/)
- [The Difference Between Virtual DOM and DOM](http://reactkungfu.com/2015/10/the-difference-between-virtual-dom-and-dom/)
- [1-way vs 2-way Databinding](http://stackoverflow.com/a/37566693/1525534)
- [Presentational and Container Components](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0#.htl1bug49)
- [React Global Error Handling](http://stackoverflow.com/a/31112522/1525534)
- [Redux Logger](https://github.com/evgenyrodionov/redux-logger)
- [Redux Ducks File Structure](https://medium.com/@scbarrus/the-ducks-file-structure-for-redux-d63c41b7035c#.ji6r2j61o)
- [React Logger](https://www.npmjs.com/package/react-logger)
- [ES6 Highlights](https://pure-essence.net/2015/11/29/javascript-es6-highlights/)
- [React/Redux Router Tutorial](https://github.com/reactjs/react-router-redux#tutorial)
- [Redux Middleware](http://redux.js.org/docs/advanced/Middleware.html)
- [Redux Wes Box Redux Tutorials](https://www.youtube.com/watch?v=hmwBow1PUuo&list=PLu8EoSxDXHP5uyzEWxdlr9WQTJJIzr6jy)
- [Master Redux Resources List](https://github.com/xgrommx/awesome-redux)

## License & Credits

- [MIT](LICENSE)
- [Victor Choueiri](https://github.com/xqwzts), who reviewed the code
- [Manuel Bieh](https://github.com/manuelbieh), who reviewed the code
- [Google font used for header](https://fonts.google.com/specimen/Fjalla+One)
