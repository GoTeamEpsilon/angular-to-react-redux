'use strict';

angular
  .module('patientDemographicsExampleApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'angular-logger' // enhances `$log` to have a better format/context-awareness
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/patient/:pid', {
        templateUrl: 'scripts/patient/patient.html',
        controller: 'PatientCtrl',
        controllerAs: 'vm'
      })
      .otherwise({
        redirectTo: '/patient/1337'
      });
  });
