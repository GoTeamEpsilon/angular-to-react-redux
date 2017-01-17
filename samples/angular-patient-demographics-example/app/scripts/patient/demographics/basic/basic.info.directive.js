(function() {
  'use strict';

  angular
    .module('patientDemographicsExampleApp.patient.demographics.basic')
    .directive('basicInfo', function() {
      return {
        templateUrl: 'scripts/patient/demographics/basic/basic.info.view.html',
        restrict: 'E',
        link: function() {},
        scope: {
          'basic': '='
        },
        controllerAs: 'vm',
        bindToController: true,
        controller: 'BasicInfoController'
      };
    });
})();
