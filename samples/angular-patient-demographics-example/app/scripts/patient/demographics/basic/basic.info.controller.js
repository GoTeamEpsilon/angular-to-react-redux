(function() {
  'use strict';

  angular
    .module('patientDemographicsExampleApp.patient.demographics.basic')
    .controller('BasicInfoController', BasicInfoController);

  BasicInfoController.$inject = ['$log', '$scope'];

  function BasicInfoController($log, $scope) {
    var logger = $log.getInstance('BasicInfoController');

    var vm = this;

    // Used for "edit" -> "cancel" reverts
    var cachedDataForEditMode = null;

    vm.emailPattern = '.*@.*';

    vm.genders = {
      Male: 'Male',
      Female: 'Female',
      Other: 'Other'
    };

    vm.mode = null;

    vm.MODES = {
      READ: 'read',
      SAVE: 'save',
      EDIT: 'edit',
      CANCEL: 'cancel'
    };

    vm.inEditMode = function() {
      return vm.mode === vm.MODES.EDIT;
    };

    vm.inReadMode = function() {
      return vm.mode === vm.MODES.READ;
    };

    vm.changeMode = function(newMode) {
      logger.debug('Requesting mode be changed to ' + newMode);

      switch(newMode) {
        case vm.MODES.CANCEL:
          handleCancelMode();
          break;
        case vm.MODES.EDIT:
          handleEditMode();
          break;
        case vm.MODES.SAVE:
        case vm.MODES.READ:
          handleSaveMode();
          break;
      }
    };

    function handleEditMode() {
      logger.debug('Caching previous contact state');

      cachedDataForEditMode = angular.copy(vm.basic);
      vm.mode = vm.MODES.EDIT;
    }

    function handleCancelMode() {
      logger.debug('Applying previous contact state cache');

      angular.copy(cachedDataForEditMode, vm.basic);
      vm.mode = vm.MODES.READ;
    }

    function handleSaveMode() {
      vm.mode = vm.MODES.READ;

      logger.debug('Releasing previous contact state cache');
      cachedDataForEditMode = null;

      // In a real app, the `PatientService.upsertBasicInfo` would be called
    }

    function construct() {
      logger.debug('Constructing basic info directive');

      vm.changeMode(vm.MODES.READ); // Default mode

      vm.initialDate = angular.copy(vm.basic.dob);
    }

    // vm.basic is not immediately available. Wait for it to be passed.
    var unregister = $scope.$watch(angular.bind(vm, function() {
      return this.basic;
    }), function (newVal) {
      if (newVal) {
        unregister();
        construct();
      }
    });
  }
})();
