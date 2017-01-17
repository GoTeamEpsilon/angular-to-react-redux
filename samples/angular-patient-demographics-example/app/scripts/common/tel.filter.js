(function() {
  'use strict';

  angular
    .module('patientDemographicsExampleApp')
    .filter('telFilter', telFilter);

  function telFilter() {
    // In the return function, we must pass in a single parameter which will be the data we will work on.
    // We have the ability to support multiple other parameters that can be passed into the filter optionally
    return function(input) {
      if (!input) {
        return;
      }

      if(input.toString().length === 10 ) {
        var outputTempString = input.toString();
        var outputString = outputTempString.substr(0,3) + '-' + outputTempString.substr(3,3) + '-' + outputTempString.substr(6,4);
        return outputString;
      } else {
        return input.toString();
      }
    };
  }
})();
