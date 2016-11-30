![img](http://www.textfiles.com/underconstruction/BaBajaMesa3235construct.gif)

# Angular to React
A playground repository that will be filled with educational resources and live code as our dev group (Angular experts) learns React/Redux by contrasting it to Angular concepts. This repository is best consumed by those that have been working with Angular 1.x for a good amount of time.

## Project Generator

Similar to Yeoman's [Yo Angular](https://github.com/yeoman/generator-angular), the React/Redux community offers a [starter kit](https://github.com/davezuko/react-redux-starter-kit) that has everything you need. The code is rather intimdating at first, but don't worry as it will make sense as you continue to study.

Be sure to provide your editor with plugins for [eslint](http://eslint.org/), [JavaScript ES6 syntax](https://www.google.com/search?q=es6+plugin) and [React JSX syntax](https://www.google.com/search?q=jsx+plugin).

## ng-repeat

```jsx
<div className="cards">
  <div className="info">
    {['x', 'y', 'z'].map((info) => <p>{info}</p>)}
  </div>
</div>
```

Note that you can get the index by specifying an index parameter: `['x', 'y', 'z'].map((key, index) =>`.

## ng-show, ng-hide
## ng-if
## ng-style
## ng-class
## ng-click
## filters
## directives / directive controllers
## services
## SCSS integration
## JavaScript vendoring
## CSS/SCSS vendoring
## Development flags
## JavaScript sourcemapping
## JavaScript obfuscation/minification
## Module namespacing / John Papa guide equivalency
## Global error handling
## Promise integration
## Provider decoration
## Logging best practices
## Deconstructors (i.e.: $destroy)
## Folder structure best practices
## $apply / $applyAsync practices (or the absense of them)
## ES5 vs ES6 usages
## Recommended $http practices
## Data binding
## Transclusion
## $broadcast
## Routing
## Subviews
## Dependency injection
## Unit testing
## Code style enforcement
## Recommended documentation practices
## Code linting practices


# Rationale

_Q:_ Wait... surely someone has researched and documented this (e.g.: [SitePoint: React for Angular Developers](https://www.sitepoint.com/react-for-angular-developers/)), why reinvent the wheel?

_A:_ Because first-person studies and writing code are the best approaches to learning.

### License

MIT
