angular.module('patientDemographicsExampleApp')
  .filter('ssnFilter', function() {
  
  // In the return function, we must pass in a single parameter which will be the data we will work on.
  // We have the ability to support multiple other parameters that can be passed into the filter optionally
  return function(input) {
    console.log("SSN Filter is running");
    
    
    if(input.length < 9) {
      return input;
    } else {
      var outputTempString = input.toString();
      var outputString = outputTempString.substr(0,3) + "-" + outputTempString.substr(3,2) + "-" + outputTempString.substr(6,4);
    }
    
    
    // Do filter work here
    
    return outputString;
    
  }
  
});
