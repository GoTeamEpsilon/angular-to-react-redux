(function() {
  'use strict';

  angular
    .module('patientDemographicsExampleApp.patient.demographics')
    .directive('demographics', function() {
      return {
        templateUrl: 'scripts/patient/demographics/demographics.view.html',
        restrict: 'E',
        link: function() {},
        scope: {
          patientId: '='
        },
        controllerAs: 'vm',
        bindToController: true,
        controller: 'DemographicsController'
      };
    });
})();
