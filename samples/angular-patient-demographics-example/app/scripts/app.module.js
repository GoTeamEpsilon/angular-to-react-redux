(function() {
  'use strict';

  angular
    .module('patientDemographicsExampleApp', [
      'ngAnimate',
      'ngCookies',
      'ngResource',
      'ngRoute',
      'ngSanitize',
      'ngTouch',
      '720kb.datepicker',
      'ui.mask',
      'angular-logger', // enhances `$log` to have a better format/context-awareness
      'patientDemographicsExampleApp.patient'
    ]);
})();
