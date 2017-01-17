(function() {
  'use strict';

  angular
    .module('patientDemographicsExampleApp.patient', [
      'patientDemographicsExampleApp.patient.demographics'
    ])
    .config(function ($routeProvider) {
      $routeProvider
        .when('/patient/:pid', {
          templateUrl: 'scripts/patient/patient.html',
          controller: 'PatientController',
          controllerAs: 'vm'
        })
        .otherwise({
          redirectTo: '/patient/1337'
        });
    });
})();
