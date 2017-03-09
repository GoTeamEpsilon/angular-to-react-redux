![img](http://www.textfiles.com/underconstruction/HeHeartlandBluffs8237Photo_2000construction5_anim.gif)

![img](http://i.imgur.com/Gq1eJpa.png)

# Angular to React/Redux

This repository is an educational resource for Angular v1 experts that are looking to learn React/Redux. A contrived sample application for managing basic patient information is provided using both technologies' best practices (look under `samples/` to see both versions). This application will be referred to below as we explore the key philosophical differences between Angular v1 and React/Redux so that you can get coding!

Getting Started
===============

### 🔨 Scaffolding & Tooling

Once the technologies for a project are choosen, the next step is to figure out how to scaffold and build the application using production-ready practices. Angular v1 applications are typically wired together using a mixture of [NPM](https://www.npmjs.com/) and [Bower](https://bower.io/) (dependency management) and [Grunt](https://gruntjs.com/) or [Gulp](http://gulpjs.com/) (build tooling). In the React/Redux world, NPM and Webpack are the way to go... in fact, this repo uses and recommends the [react-redux-starter-kit](https://github.com/davezuko/react-redux-starter-kit).

Scaffolding a project in React/Redux isn't very different from what is typically done in Angular v1 (with some exceptions with the [John Papa styleguide](https://github.com/johnpapa/angular-styleguide)). Here's the `tree` output of both samples in this repository:

```
                 Angular v1                                        React/Redux
                ------------                                      -------------
├── app.module.js                                   ├── common
├── common                                          │   ├── CustomValidators.js
│   ├── ssn.filter.js                               │   ├── Formatters.js
│   └── tel.filter.js                               │   ├── FormsyDatePicker.js
├── patient                                         │   ├── FormsyInput.js
│   ├── demographics                                │   └── FormsyMaskedInput.js
│   │   ├── basic                                   ├── components
│   │   │   ├── basic.info.controller.js            ├── containers
│   │   │   ├── basic.info.directive.js             │   └── AppContainer.js
│   │   │   ├── basic.info.view.html                ├── index.html
│   │   │   └── basic.module.js                     ├── layouts
│   │   ├── contact                                 │   └── CoreLayout
│   │   │   ├── contact.info.controller.js          │       ├── CoreLayout.js
│   │   │   ├── contact.info.directive.js           │       ├── CoreLayout.scss
│   │   │   ├── contact.info.view.html              │       └── index.js
│   │   │   └── contact.module.js                   ├── main.js
│   │   ├── demographics.controller.js              ├── routes
│   │   ├── demographics.directive.js               │   ├── index.js
│   │   ├── demographics.module.js                  │   └── Patient
│   │   └── demographics.view.html                  │       ├── Demographics
│   ├── patient.controller.js                       │       │   ├── Basic
│   ├── patient.html                                │       │   │   └── BasicComponent.js
│   ├── patient.module.js                           │       │   ├── Contact
│   └── patient.service.js                          │       │   │   └── ContactComponent.js
└── index.html                                      │       │   │
                                                    │       │   ├── PatientDemographicsComponent.js
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

In Angular v1, directives are typically introduced in views that are controlled by route-level controllers. In React/Redux, components are introduced in the same way, however, a container must be placed in the middle so that the component can get app-wide state (this is the store and will be explained in the section below) as well as functions to upper level services.

### 📝 Filters & Validation

Within Angular v1 directives, filters are injected and validation logic is specified with custom Angular v1 attribute. Redux-aware components import plain JavaScript functions to handle these view-related concerns.

Service Layer
=============

### 💿 Store

Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

### 🏭 Modules

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

Unit Testing
============

### 🔬 Frameworks & Philosophy

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

Additional Resources
============

- (link to resource on react component lifecycle)
- (link to resource on react one way data binding)
- (link to resource on top level error handler)
- (link to resource on logging best practices)
- (link to resource on es5 vs es6)
- (link to resource on redux routing links)
- (link to resource on dependency Injection)

### License

MIT
