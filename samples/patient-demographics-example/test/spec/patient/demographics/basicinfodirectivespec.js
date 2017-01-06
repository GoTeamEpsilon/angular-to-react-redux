'use strict';

describe('BasicInfoDirective', function () {
  var element;
  var template;
  var controller;
  var scope;

  var testData = {
    name: 'John Doe',
    dob: '1990-11-04',
    ss: 999999999,
    martialStatus: 'Single',
    gender: 'Male',
    billingNote: ' N/A',
    otherNote: ' N/A',
    address: '321 Bazbop Ln',
    city: 'CoolCity',
    postal: 54321,
    state: 'Texas',
    country: 'US',
    phone: 321321431,
    email: 'foo@bar.com'
  };

  beforeEach(module('patientDemographicsExampleApp'));

  beforeEach(inject(function($controller, $rootScope, $compile) {
    scope = $rootScope.$new();

    scope.testData = testData;

    element = angular.element('<basic-info basic="testData"></basic-info>');
    template = $compile(element)(scope);
    scope.$digest();
    controller = element.controller('basicInfo');
  }));

  describe('_construct', function() {
    it('sets the default mode to read mode', function() {
      expect(controller.mode).toBe(controller.MODES.READ);
    });

    it('caches the initial date for the date picker', function() {
      // Crazy hack to check if date '1990-11-04' matches '1990-11' because the
      // 720kb.datepicker appears to decrement the date by one day with each test
      // construct
      var match = (controller.initialDate.indexOf('1990-11') > -1);
      expect(match).toBe(true);
    });
  });

  describe('changeMode', function() {
    describe('edit mode', function() {
      beforeEach(function() {
        spyOn(angular, 'copy').and.callThrough();
        controller.changeMode(controller.MODES.EDIT);
      });

      it('caches the current data in case of cancellation', function() {
        expect(angular.copy).toHaveBeenCalledWith(scope.testData);
      });

      it('sets the mode to edit mode', function() {
        expect(controller.mode).toBe(controller.MODES.EDIT);
      });
    });

    describe('cancel mode', function() {
      beforeEach(function() {
        spyOn(angular, 'copy').and.callThrough();
        controller.changeMode('edit');
        scope.testData.name = 'Not John Doe';
        controller.changeMode(controller.MODES.CANCEL);
      });

      it('reverts current data to the cache (original data, in this case)', function() {
        expect(angular.copy).toHaveBeenCalledWith(testData, jasmine.any(Object));
      });

      it('uses the initial data cached before editing', function() {
        // Examines the value that we know was touched (simple diff check)
        expect(controller.basic.name).toBe('John Doe');
      });

      it('sets the mode to read mode (functionally equiv. to cancel mode)', function() {
        expect(controller.mode).toBe(controller.MODES.READ);
      });
    });

    describe('save mode', function() {
      beforeEach(function() {
        spyOn(angular, 'copy').and.callThrough();
        controller.changeMode('edit');
        scope.testData.name = 'Foobar John Doe';
        controller.changeMode(controller.MODES.SAVE);
      });

      it('uses the name data save after editing', function() {
        // Examines the value that we know was touched (simple diff check)
        expect(controller.basic.name).toBe('Foobar John Doe');
      });

      it('sets the mode to read mode (functionally equiv. to save mode)', function() {
        expect(controller.mode).toBe(controller.MODES.READ);
      });
    });
  });

  describe('inEditMode', function() {
    describe('positive case', function() {
      beforeEach(function() {
        controller.changeMode(controller.MODES.EDIT);
      });

      it('evaluates to true', function() {
        expect(controller.inEditMode()).toBe(true);
      });
    });

    describe('negative case', function() {
      beforeEach(function() {
        controller.changeMode(controller.MODES.READ);
      });

      it('evaluates to false', function() {
        expect(controller.inEditMode()).toBe(false);
      });
    });
  });

  describe('inReadMode', function() {
    describe('positive case - save', function() {
      beforeEach(function() {
        controller.changeMode(controller.MODES.SAVE);
      });

      it('evaluates to true', function() {
        expect(controller.inReadMode()).toBe(true);
      });
    });

    describe('positive case - cancel', function() {
      beforeEach(function() {
        controller.changeMode(controller.MODES.CANCEL);
      });

      it('evaluates to true', function() {
        expect(controller.inReadMode()).toBe(true);
      });
    });

    describe('positive case - read', function() {
      beforeEach(function() {
        controller.changeMode(controller.MODES.READ);
      });

      it('evaluates to true', function() {
        expect(controller.inReadMode()).toBe(true);
      });
    });

    describe('negative case', function() {
      beforeEach(function() {
        controller.changeMode(controller.MODES.EDIT);
      });

      it('evaluates to false', function() {
        expect(controller.inReadMode()).toBe(false);
      });
    });
  });
});
