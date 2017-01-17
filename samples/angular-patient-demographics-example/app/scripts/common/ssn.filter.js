(function() {
  'use strict';

  angular
    .module('patientDemographicsExampleApp')
    .filter('ssnFilter', ssnFilter);

  function ssnFilter() {
    // In the return function, we must pass in a single parameter which will be the data we will work on.
    // We have the ability to support multiple other parameters that can be passed into the filter optionally
    return function(input) {
      if (!input) {
        return;
      }

      var outputString;

      if (input.length < 9) {
        return input;
      } else {
        var outputTempString = input.toString();
        outputString = outputTempString.substr(0,3) + '-' + outputTempString.substr(3,2) + '-' + outputTempString.substr(5,4);
      }

      return outputString;
    };
  }
})();
