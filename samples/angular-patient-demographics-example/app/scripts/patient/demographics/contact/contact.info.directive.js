(function() {
  'use strict';

  angular
    .module('patientDemographicsExampleApp.patient.demographics.contact')
    .directive('contactInfo', function() {
      return {
        templateUrl: 'scripts/patient/demographics/contact/contact.info.view.html',
        restrict: 'E',
        link: function() {},
        scope: {
          'contact': '='
        },
        controllerAs: 'vm',
        bindToController: true,
        controller: 'ContactInfoController'
      };
    });
})();
