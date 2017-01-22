(function() {
  'use strict';

  describe('ContactInfoController', function () {
    var controller;
    var scope;

    var testData = {
      name: 'Sam Doe',
      relation: 'Father',
      address: '123 Foobar Ln',
      city: 'CoolCity',
      postal: 12345,
      state: 'Texas',
      country: 'US',
      phone: 9876543211,
      email: 'baz@bop.com'
    };

    beforeEach(module('patientDemographicsExampleApp'));

    // what are you injecting this into? into the module? you're manually
    // loading the dependencies into the module?
    beforeEach(inject(function($controller, $rootScope, $log, PatientService) {
      scope = $rootScope.$new();

      controller = $controller('ContactInfoController', {
        $log: $log,
        $scope: scope,
        PatientService: PatientService
      });

      controller.basic = testData;
      scope.$digest();
    }));

    describe('construct', function() {
      it('sets the default mode to read mode', function() {
        expect(controller.mode).toBe(controller.MODES.READ);
      });


    });
  
   

  });
})();
