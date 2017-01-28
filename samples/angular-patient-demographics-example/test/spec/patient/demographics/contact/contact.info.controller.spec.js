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

      controller.contact = testData;
      scope.$digest();
    }));

    describe('construct', function() {
      it('sets the default mode to read mode', function() {
        expect(controller.mode).toBe(controller.MODES.READ);
      });
    });
  
    describe('changeMode', function() {
      describe('edit mode', function() {
        beforeEach(function() {
          // what does callThrough do? - Personal Research Q
          spyOn(angular, 'copy').and.callThrough();
          controller.changeMode(controller.MODES.EDIT);
        });
      
        it('caches the current data in case of cancellation', function() {
          expect(angular.copy).toHaveBeenCalledWith(testData);
        });
      
        it('sets the mode to edit mode', function() {
          expect(controller.mode).toBe(controller.MODES.EDIT);
        });
      });
    
      describe('cancel mode', function() {
        beforeEach(function() {
          spyOn(angular, 'copy').and.callThrough();
          controller.changeMode('edit');
          controller.name = 'Not Sam Doe';
          controller.changeMode(controller.MODES.CANCEL);
        });
      
        // What does jasmine.any() do? - - Personal Research Q
        it('reverts current data to the cache (original data, in this case)', function() {
          expect(angular.copy).toHaveBeenCalledWith(testData, jasmine.any(Object));
        });
      
        it('uses the initial data cached before editing', function() {
          // Examines the value that we know was touched (simple diff check)
          expect(controller.contact.name).toBe('Sam Doe');
        });
      
        it('sets the mode to read mode (functionally equiv. to cancel mode)', function() {
          expect(controller.mode).toBe(controller.MODES.READ);
        });
      });
    
      describe('save mode', function() {
        beforeEach(function() {
          // why do you even need a spy here?
          spyOn(angular, 'copy').and.callThrough();
          controller.changeMode('edit');
          controller.contact.name = 'CopyMode Sam Doe';
          controller.changeMode(controller.MODES.SAVE);
        });
      
        it('uses the name data save after editing', function() {
          // Examines the value that we know was touched (simple diff check)
          expect(controller.contact.name).toBe('CopyMode Sam Doe');
        });
      
        it('sets the mode to read mode (functionally equiv. to save mode)', function() {
          expect(controller.mode).toBe(controller.MODES.READ);
        });
      });
    });
  
   

  });
})();
