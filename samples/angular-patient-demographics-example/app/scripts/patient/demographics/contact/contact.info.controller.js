(function() {
  'use strict';

  angular
    .module('patientDemographicsExampleApp.patient.demographics.contact')
    .controller('ContactInfoController', ContactInfoController);

  ContactInfoController.$inject = ['$log', '$scope', 'PatientService'];

  function ContactInfoController($log, $scope, PatientService) {
    var logger = $log.getInstance('ContactInfoDirective');
    var vm = this;

    // Used for "edit" -> "cancel" reverts
    var cachedDataForEditMode = null;

    vm.emailPattern = '.*@.*';

    vm.mode = null;

    vm.MODES = {
      READ: 'read',
      SAVE: 'save',
      EDIT: 'edit',
      CANCEL: 'cancel',
      DELETE: 'delete'
    };

    vm.inCreateMode = function() {
      // `.isBeingAdded` is the prop applied in the service layer.
      // It's existance informs us that this is a new object.
      return vm.contact.isBeingAdded;
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
          handleSaveMode();
          break;
        case vm.MODES.DELETE:
          handleDeleteMode();
          break;
        default:
          vm.mode = vm.MODES.READ;
      }
    };

    function handleEditMode() {
      logger.debug('Caching previous contact state');
      cachedDataForEditMode = angular.copy(vm.contact);
      vm.mode = vm.MODES.EDIT;
    }

    function handleCancelMode() {
      logger.debug('Applying previous contact state cache');
      angular.copy(cachedDataForEditMode, vm.contact);
      vm.mode = vm.MODES.READ;
    }

    function handleSaveMode() {
      vm.contact.isBeingAdded = false;
      vm.mode = vm.MODES.READ;

      logger.debug('Releasing previous contact state cache');
      cachedDataForEditMode = null;

      // In a real app, the `PatientService.upsertContact` would be called
    }

    function handleDeleteMode() {
      if (window.confirm('Are you sure you want to delete this contact?')) {
        PatientService.deleteContact(vm.contact);
      }
    }

    function construct() {
      logger.debug('Constructing contacts directive');

      vm.changeMode(vm.MODES.READ); // Default mode
    }

    // vm.contact is not immediately available. Wait for it to be passed.
    // why is this variable called unregister????? - DE
    var unregister = $scope.$watch(angular.bind(vm, function() {
      return this.contact;
    }), function (newVal) {
      if (newVal) {
        unregister();
        construct();
      }
    });
  }
})();
