![img](http://www.textfiles.com/underconstruction/HeHeartlandBluffs8237Photo_2000construction5_anim.gif)

[![Build Status](https://travis-ci.org/GoTeamEpsilon/angular-to-react-redux.svg?branch=master)](https://travis-ci.org/GoTeamEpsilon/angular-to-react-redux)

![img](http://i.imgur.com/Gq1eJpa.png)

This repository is an educational resource for Angular v1 experts that are looking to learn React/Redux. A contrived sample application for managing basic patient information is provided using both technologies' best practices (look under `samples/` to see both versions). This application will be referred to below as we explore the key philosophical differences between Angular v1 and React/Redux so that you can get coding!

Getting Started
===============

### 🔨 Scaffolding & Tooling

Once the technologies for a project are choosen, the next step is to figure out how to scaffold and build the application using production-ready practices. Angular v1 applications are typically wired together using a mixture of [NPM](https://www.npmjs.com/) and [Bower](https://bower.io/) (dependency management) and [Grunt](https://gruntjs.com/) or [Gulp](http://gulpjs.com/) (build tooling). In the React/Redux world, NPM and Webpack are the way to go... in fact, this repo uses and recommends the [react-redux-starter-kit](https://github.com/davezuko/react-redux-starter-kit).

Scaffolding a project in React/Redux isn't very different from what is typically done in Angular v1 (with some exceptions with the [John Papa styleguide](https://github.com/johnpapa/angular-styleguide)). Here's the `tree` output of both samples in this repository:

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

### 🎛 Directives vs Components

The heart of Angular v1 is directives. These discrete interfaces take in 1 and 2-way data parameters and inject services that really power up your view. Fortunately, directives are not that different from Redux-aware React components.

In Angular v1, directives are typically introduced in views that are controlled by route-level controllers. In React/Redux, components are introduced in the same way, however, a container must be placed in the middle so that the component can get app-wide state (this is the store and will be explained below) as well as functions to upper level services. Please note, however, that React/Redux follows a unidirectional data flow... but don't worry, this guide will (hopefully) demystify how you alter your way of thinking about UIs from 2-way to a 1-way perspective.

### 📝 Filters & Validation

Within Angular v1 directives, filters are injected and validation logic is specified with custom Angular v1 attribute. Redux-aware components import plain JavaScript functions to handle these view-related concerns. For example the `basic` components' SSN field can be compared below:

#### Angular v1

```
<!-- ssnFilter is injected from a custom filter provider -->
<td><strong>S.S.:</strong> {{vm.basic.ss | ssnFilter}}</td>
```

```
<td><strong>SSN:</strong> <input type="text" name=ssn ng-model="vm.basic.ss" ng-minlength="9" ui-mask="999-99-9999" required/>
<div><p ng-show="basicInfoForm.ssn.$invalid && !basicInfoForm.ssn.$pristine" class="help-block">9 digits are required for SSN</p></div></td>
```

#### React/Redux

```
<!-- socialSecurityFormat is just an important JavaScript function -->
<td><strong>S.S.:</strong> {socialSecurityFormat(this.props.info.ss)}</td>
```

```
<td>
  <FormsyMaskedInput mask={[/\d/,/\d/,/\d/,'-',/\d/,/\d/,'-',/\d/,/\d/,/\d/,/\d/]}
                     value={this.state.ss}
                     onChange={this.handleInputChange}
                     validations={{
                       isLength: 9
                     }}
                     sanitizationFunction={this.sanitizeToJustNumbers}
                     validationErrors={{
                       isDefaultRequiredValue: 'Valid SSN is required',
                       isLength: 'Valid SSN is required'
                     }}
                     name='ss'
                     label='SSN'
                     required />
</td>
```

Service Layer
=============

### 🌿 Store

In Angular v1, app-wide state is put into services so that directive controllers can CRUD it. In React/Redux, all app-wide state is put into the store that components can access via module functions that containers pass down to components. The store is an object tree.

### ✨ Actions & Pure Reducers

Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

### 🏭 Modules

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

Unit Testing
============

### 🔬 Frameworks & Philosophy

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

Additional Resources
====================

- [React Component Lifecycle](http://busypeoples.github.io/post/react-component-lifecycle/)
- [The Difference Between Virtual DOM and DOM](http://reactkungfu.com/2015/10/the-difference-between-virtual-dom-and-dom/)
- [1-way vs 2-way Databinding](http://stackoverflow.com/a/37566693/1525534)
- [React Global Error Handling](http://stackoverflow.com/a/31112522/1525534)
- [Redux Logger](https://github.com/evgenyrodionov/redux-logger)
- [React Logger](https://www.npmjs.com/package/react-logger)
- [ES6 Highlights](https://pure-essence.net/2015/11/29/javascript-es6-highlights/)
- [React/Redux Router Tutorial](https://github.com/reactjs/react-router-redux#tutorial)
- [Redux Middleware](http://redux.js.org/docs/advanced/Middleware.html)
- [Redux Wes Box Redux Tutorials](https://www.youtube.com/watch?v=hmwBow1PUuo&list=PLu8EoSxDXHP5uyzEWxdlr9WQTJJIzr6jy)
- [Master Redux Resources List](https://github.com/xgrommx/awesome-redux)

## License & Credits

- [MIT](LICENSE)
- [Google font used for header](https://fonts.google.com/specimen/Fjalla+One)
