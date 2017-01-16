angular.module('patientDemographicsExampleApp')
  .filter('telFilter', function() {
    
    // In the return function, we must pass in a single parameter which will be the data we will work on.
    // We have the ability to support multiple other parameters that can be passed into the filter optionally
    return function(input) {
      console.log("Tel Filter is running");
      
      if(input.toString().length === 10 ) {
        var outputTempString = input.toString();
        var outputString = outputTempString.substr(0,3) + "-" + outputTempString.substr(3,3) + "-" + outputTempString.substr(6,4);
        return outputString;
      } else {
        console.log("Else");
        console.log(input.toString().length);
        return input.toString();
      }
      
    }
    
  });
