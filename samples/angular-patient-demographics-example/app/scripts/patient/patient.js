'use strict';

angular.module('patientDemographicsExampleApp')
  .controller('PatientCtrl', ['$routeParams', function ($routeParams) {
    var vm = this;

    // The patient id comes from the route `/patient/:id`
    vm.patientId = $routeParams.pid;
  }]);
