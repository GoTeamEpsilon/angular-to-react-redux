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

In React, a variable that holds CSS values can be created and later assigned as the inline style of an element. Keep in mind that camelCase is used, so "background-color" becomes "backgroundColor", "font-size" becomes "fontSize", and so on. 

If you want to alter the style of elements through a click event, similar to what is shown in the Angular documentation [here](https://docs.angularjs.org/api/ng/directive/ngStyle), you can attach a function to the "onClick" React Synthetic Event. This function can then for instance result in the changing of a class name, or the direct manipulation of a variable that is serving as the value for a CSS property like "marginBottom", "padding", etc. In Example 2 and 3 this will be demonstrated with a variable that exists in local React State (not to be confused with Redux State).

### First Example That Uses a Variable in the Style Attribute of HTML Element
```jsx

class ngStyleExample1 extends React.Component {

  constructor(props) {
    super(props);
  }  

  render() {
    var firstExampleStyle = {backgroundColor: "green"};
    
    return (
		<div>
        <p 
	      	id="firstExampleWithNoEventHandler" 
	      	style={firstExampleStyle}
      	>
	      	Example 1 Blah Blah Blah
	      </p>
		</div>

    );
  }

}
```

### Second and Third Example That Manipulate the Style of An Element
```jsx
class ngStyleExample2and3 extends React.Component {

  constructor(props) {
    super(props);
    this.handleStyleClick = this.handleStyleClick.bind(this); // n.b. ES6 React does not take care of 'this' binding
    this.state = {
    	cssClass : "redBackground"
    	styleValue : "20"
    };
  }

  /*
    Second example
    Clicking on the <p> tag changes its class, which alters its style
  */
  handleClassClick() {
    if(this.state.cssClass === "redBackground") {
    	this.setState(cssClass : "blueBackground");
    } else {
    	this.setState(cssClass : "redBackground");
    }
  }

  /*
    Third example
    Clicking on the <p> tag directly alters the value on which the style is calculated (fontSize)
	*/
  handleStyleClick() {
  	this.setState(styleValue : this.state.styleValue + 5);

  }

  render() {
    return (
	     <div>
  	     <p 
  	      	id="changeClassExample" 
  	      	className={this.state.cssClass} 
  	      	onClick = {() => this.handleClassClick}
        	 >
  	       Example 2 Blah Blah Blah
  	     </p>

  	     <p 
  	      	id="directlyChangeStyleExample" 
  	      	style={{fontSize : this.state.styleValue}} 
  	      	onClick = { this.handleStyleClick } 
    		 >
    		  Example 3 Blah Blah Blah	
  	     </p>
	     </div>

    );
  }
}
```

## ng-class
## ng-click
## filters
## directives / directive controllers
## services
**Temporary Notes:** services are similar to "containers" in React. People use containers when they start to duplicate 
functionality in components, much like someone would realize they have duplicate logic in their
directives. In React, containers would also be where you would want to make asynchronous calls.

In Redux, containers are more nuanced. They serve as wrappings for "dumb components". They are responsible for fetching
state for the Redux store. These will be the files where you actually leverage the React-Redux library / bindings.
## SCSS integration
## JavaScript vendoring
## CSS/SCSS vendoring
## Development flags
## JavaScript sourcemapping
## JavaScript obfuscation/minification
**Temporary Notes:** when you run Webpack, just append the "-p" flag to your command. 
So instead of `webpack --config webpack.prod.config.js` do `webpack -p --config webpack.prod.config.js` in your package.json.
This is the only easy part of Webpack.

## Module namespacing / John Papa guide equivalency
## Global error handling
## Promise integration
**Temporary Notes:** There is no official promise library or standard for React or Redux. The two most popular libraries
currently are Bluebird and Axios. For straightforward API requests over HTTP, Axios is preferred.
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
**Temporary Notes:** pretty much everyone uses React-Router for routing with React
[https://github.com/ReactTraining/react-router](https://github.com/ReactTraining/react-router)
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
