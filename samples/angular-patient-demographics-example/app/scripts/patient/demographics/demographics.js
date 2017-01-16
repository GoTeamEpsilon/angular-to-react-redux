'use strict';

angular.module('patientDemographicsExampleApp')
  .directive('demographics', function() {
    return {
      template: '<h3 ng-show="vm.isLoading">Loading...</h3>' +

                '<div ng-show="!vm.isLoading" class="demographics">' +
                '  <ul class="nav nav-tabs">' +
                '    <li ng-click="vm.changeTab(vm.TABS.BASIC)"' +
                '        ng-class="{active: vm.inBasicTab()}">' +
                '          <a nohref>Basic</a>' +
                '    </li>' +
                '    <li ng-click="vm.changeTab(vm.TABS.CONTACTS)"'+
                '        ng-class="{active: vm.inContactsTab()}">' +
                '          <a nohref>Contact</a>' +
                '    </li>' +
                '    <li><a nohref ng-click="vm.mockedTab()">Choices</a></li>' +
                '    <li><a nohref ng-click="vm.mockedTab()">Employer</a></li>' +
                '    <li><a nohref ng-click="vm.mockedTab()">Stats</a></li>' +
                '    <li><a nohref ng-click="vm.mockedTab()">Misc</a></li>' +
                '  </ul>' +

                '  <div class="body">' +
                '    <basic-info ng-show="vm.inBasicTab()"' +
                '                basic="vm.basicInformation">' +
                '    </basic-info>' +

                '    <div ng-show="vm.inContactsTab()">' +
                '      <div ng-repeat="contact in vm.contacts">' +
                '        <contact-info contact="contact">' +
                '        </contact-info>' +
                '        <br /><br />' +
                '      </div>' +
                '      <button type="button"' +
                '              class="btn btn-default btn-sm"' +
                '              ng-click="vm.addNewContact()">NEW CONTACT</button>' +
                '    </div>' +
                '  </div>' +
                '</div>',
      restrict: 'E',
      link: function() {},
      scope: {
        patientId: '='
      },
      controllerAs: 'vm',
      bindToController: true,
      controller: ['$log', '$scope', 'PatientService', function($log, $scope, PatientService) {
        var logger = $log.getInstance('DemographicsDirective');
        var vm = this;

        vm.tab = null;

        // Used for if the "Loading..." text blurb needs to be shown
        // while the patient context is being set/fetched on the service.
        vm.isLoading = null;

        vm.TABS = {
          BASIC: 'basic',
          CONTACTS: 'contacts'
        };

        vm.inBasicTab = function() {
          return vm.tab === vm.TABS.BASIC;
        };

        vm.inContactsTab = function() {
          return vm.tab === vm.TABS.CONTACTS;
        };

        vm.changeTab = function(newTab) {
          logger.debug('Setting tab to ' + newTab);
          vm.tab = newTab;
        };

        vm.addNewContact = function() {
          // The service is responsible for adding a fresh object
          // with a `isBeingAdded` property. This only applies to the
          // `CONTACTS` tab.
          PatientService.startAddingNewContact(vm.patientId);
        };

        vm.mockedTab = function() {
          alert('This tab is just here for completeness. The real tabs are basic and contacts');
        };

        function _getData() {
          vm.isLoading = true;
          logger.debug('Retrieving basic patient data');
          PatientService.getPatientData()
                        .then(function(data) {
                          vm.basicInformation = data;

                          logger.debug('Retrieving patient contact list');
                          return PatientService.getPatientContacts();
                        })
                        .then(function(data) {
                          vm.contacts = data;
                        })
                        .catch(function(err) {
                          alert(err);
                          logger.warn(err);
                        })
                        .finally(function() {
                          vm.isLoading = false;
                        });
        }

        function _construct() {
          logger.debug('Constructing demographics directive');

          vm.changeTab(vm.TABS.BASIC); // Default tab

          // The demographics directive takes in a patient id. This comes
          // from the route `/patient/:id` itself. The point of the `$watch`
          // is to make sure the value is
          // loaded in before attempting to
          // set/fetch the patient context. It should take less than 500ms.
          $scope.$watch(angular.bind(vm, function() {
            return this.patientId;
          }), function (newVal) {
            if (newVal) { // a real patient id from the route at this point
              logger.info('Retrieved patient id of ' + newVal + ', loading demographics');
              PatientService.setPatientInContext(newVal)
                .then(function() {
                  _getData();
                })
                .catch(function(err) {
                  alert(err);
                  logger.warn(err);
                });
            }
          });
        }

        _construct();
      }]
    };
  });
