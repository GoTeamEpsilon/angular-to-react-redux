(function() {
  'use strict';

  angular
    .module('patientDemographicsExampleApp.patient')
    .controller('PatientController', PatientController);

  PatientController.$inject = ['$routeParams'];

  function PatientController($routeParams) {
    var vm = this;

    // The patient id comes from the route `/patient/:id`
    vm.patientId = $routeParams.pid;
  }
})();
