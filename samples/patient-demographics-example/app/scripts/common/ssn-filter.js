angular.filter('ssnFilter', function() {
  
  // In the return function, we must pass in a single parameter which will be the data we will work on.
  // We have the ability to support multiple other parameters that can be passed into the filter optionally
  return function(input) {
    console.log("SSN Filter!");
    
    
    if(input.length < 9) {
      return input;
    } else {
      var outputArray = input.split();
      var outputString = inputArray.slice(0,3).join("") + "-" + outputArray.slice(3,5).join("") + "-" + outputArray.slice(6,9).join("");
    }
    
    
    // Do filter work here
    
    return outputString;
    
  }
  
});
