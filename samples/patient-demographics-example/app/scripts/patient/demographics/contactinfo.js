'use strict';

angular.module('patientDemographicsExampleApp')
  .directive('contactInfo', function() {
    return {
      template: '<div>' +
                '  <table class="table" ng-show="vm.inReadMode() && !vm.inCreateMode()">' +
                '    <tr>' +
                '      <td><strong>Name:</strong> {{vm.contact.name}}</td>' +
                '      <td><strong>Relation:</strong> {{vm.contact.relation}}</td>' +
                '    </tr>' +
                '    <tr>' +
                '      <td><strong>Address:</strong> {{vm.contact.address}}</td>' +
                '      <td><strong>Phone:</strong> {{vm.contact.phone}}</td>' +
                '    </tr>' +
                '    <tr>' +
                '      <td><strong>City:</strong> {{vm.contact.city}}</td>' +
                '      <td><strong>Postal:</strong> {{vm.contact.postal}}</td>' +
                '    </tr>' +
                '    <tr>' +
                '      <td><strong>State:</strong> {{vm.contact.state}}</td>' +
                '      <td><strong>Country:</strong> {{vm.contact.country}}</td>' +
                '    </tr>' +
                '    <tr>' +
                '      <td><strong>Email:</strong> {{vm.contact.email}}</td>' +
                '      <td></td>' +
                '    </tr>' +
                '  </table>' +
                '  <form ng-show="vm.inEditMode() || vm.inCreateMode()" ng-submit="vm.changeMode(vm.MODES.SAVE)">' +
                '    <table class="table">' +
                '      <tr>' +
                '        <td><strong>Name:</strong> <input type="text" ng-model="vm.contact.name" /></td>' +
                '        <td><strong>Relation:</strong> <input type="text" ng-model="vm.contact.relation" /></td>' +
                '      </tr>' +
                '      <tr>' +
                '        <td><strong>Address:</strong> <input type="text" ng-model="vm.contact.address" /></td>' +
                '        <td><strong>Phone:</strong> <input type="text" ng-model="vm.contact.phone" /></td>' +
                '      </tr>' +
                '       <tr>' +
                '        <td><strong>City:</strong> <input type="text" ng-model="vm.contact.city" /></td>' +
                '        <td><strong>Postal:</strong> <input type="text" ng-model="vm.contact.postal" /></td>' +
                '      </tr>' +
                '      <tr>' +
                '        <td><strong>State:</strong> <input type="text" ng-model="vm.contact.state" /></td>' +
                '        <td><strong>Country:</strong> <input type="text" ng-model="vm.contact.country" /></td>' +
                '      </tr>' +
                '      <tr>' +
                '        <td><strong>Email:</strong> <input type="text" ng-model="vm.contact.email" /></td>' +
                '        <td></td>' +
                '      </tr>' +
                '    </table>' +
                '    <button class="btn btn-default btn-sm"' +
                '            type="submit"'+
                '            ng-click="vm.changeMode(vm.MODES.SAVE)">SAVE</button>' +
                '    <button type="button"' +
                '            class="btn btn-default btn-sm" ' +
                '            ng-show="vm.inEditMode()"' +
                '            ng-click="vm.changeMode(vm.MODES.CANCEL)">CANCEL</button>'+
                '  </form>' +
                '  <button type="button"' +
                '          class="btn btn-default btn-sm"' +
                '          ng-show="vm.inReadMode() && !vm.inCreateMode()"' +
                '          ng-click="vm.changeMode(vm.MODES.DELETE)">DELETE</button>' +
                '  <button type="button"' +
                '          class="btn btn-default btn-sm"' +
                '          ng-show="vm.inReadMode() && !vm.inCreateMode()"' +
                '          ng-click="vm.changeMode(vm.MODES.EDIT)">EDIT</button>' +
                '</div>',
      restrict: 'E',
      link: function postLink() {},
      scope: {
        'contact': '='
      },
      controllerAs: 'vm',
      bindToController: true,
      controller: ['$log', 'PatientService', function($log, PatientService) {
        var logger = $log.getInstance('ContactInfoDirective');
        var vm = this;

        // Used for "edit" -> "cancel" reverts
        var _cachedDataForEditMode = null;

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
              _handleCancelMode();
              break;
            case vm.MODES.EDIT:
              _handleEditMode();
              break;
            case vm.MODES.SAVE:
              _handleSaveMode();
              break;
            case vm.MODES.DELETE:
              _handleDeleteMode();
              break;
            default:
              vm.mode = vm.MODES.READ;
          }
        };

        function _handleEditMode() {
          logger.debug('Caching previous contact state');
          _cachedDataForEditMode = angular.copy(vm.contact);
          vm.mode = vm.MODES.EDIT;
        }

        function _handleCancelMode() {
          logger.debug('Applying previous contact state cache');
          angular.copy(_cachedDataForEditMode, vm.contact);
          vm.mode = vm.MODES.READ;
        }

        function _handleSaveMode() {
          vm.contact.isBeingAdded = false;
          vm.mode = vm.MODES.READ;

          logger.debug('Releasing previous contact state cache');
          _cachedDataForEditMode = null;

          // In a real app, the `PatientService.upsertContact` would be called
        }

        function _handleDeleteMode() {
          if (window.confirm('Are you sure you want to delete this contact?')) {
            PatientService.deleteContact(vm.contact);
          }
        }

        function _construct() {
          logger.debug('Constructing contacts directive');

          vm.changeMode(vm.MODES.READ); // Default mode
        }

        _construct();
      }]
    };
  });
