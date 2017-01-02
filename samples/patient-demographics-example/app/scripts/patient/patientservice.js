'use strict';

angular.module('patientDemographicsExampleApp')
  .factory('PatientService', ['$log', '$q', function ($log, $q) {
    var logger = $log.getInstance('PatientService');

    // The reason this service is only concerned with 1 patient context
    // at a time is because EMR (electronic medical records) workflows
    // tend to work with 1 patient at a time. For instance, a doctor at
    // small facility may "pull" up patient with id 1337 to have an
    // encounter (patient visit) where the following actions happen:
    //
    //   1) Patient change their address, so "basic" demographics are updated.
    //   2) Doctor notes that the patient has a new medical issue and adds it
    //      to their record using the "medical issues" module.
    //   3) Doctor prescribes a new medication using the "pharmacy orders" module.
    //   4) Doctor is alerted (pop up message from clinical decision support module)
    //      that patient needs to have a particular screening soon.
    //
    // Ddespite the doctor switching around modules in the application, this 1
    // patient is in "context". As you can imagine, It is important to know that
    // the data being entered/edited/review from these various modules is tied to
    // a particular patient.
    var _patientIdInContext = null;

    // Dummy data for patient because we don't have a server.
    var _testData = {
      1337: {
        basic: {
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
        },
        contacts: [{
          name: 'Jane Doe',
          relation: 'Mother',
          address: '123 Foobar Ln',
          city: 'CoolCity',
          postal: 12345,
          state: 'Texas',
          country: 'US',
          phone: 1231231234,
          email: 'bar@foo.com'
        }, {
          name: 'Sam Doe',
          relation: 'Father',
          address: '123 Foobar Ln',
          city: 'CoolCity',
          postal: 12345,
          state: 'Texas',
          country: 'US',
          phone: 1231234321,
          email: 'baz@bop.com'
        }]
      }
    };

    // This needs to be called prior to any other call in this service.
    function _setPatientInContext(patientId) {
      logger.info('attempting to set patient context to patient ' + patientId);
      return $q(function(resolve, reject) {
        var res = _testData[patientId];
        if (!res) {
          logger.warn('patient ' + patientId + ' doesn\'t exist');
          return reject('patient doesn\'t exist');
        }

        _patientIdInContext = patientId;
        return resolve();
      });
    }

    // Basic data.
    function _getPatientData() {
      logger.debug('retrieving patient basic data');
      return $q(function(resolve) {
        return resolve(_testData[_patientIdInContext].basic);
      });
    }

    // Contacts data.
    function _getPatientContacts() {
      logger.debug('retrieving patient contacts data');
      return $q(function(resolve) {
        return resolve(_testData[_patientIdInContext].contacts);
      });
    }

    function _deleteContact(contact) {
      logger.info('deleting contact "' + (contact.relation || 'N/A') + '"');
      return $q(function(resolve) {
        var contacts = _testData[_patientIdInContext].contacts;
        var index = contacts.indexOf(contact);
        contacts.splice(index, 1);
        return resolve();
      });
    }

    // Adds a fresh object for a contact to be filled in.
    function _startAddingNewContact() {
      logger.debug('Adding a fresh contact entry to be filled in');
      return $q(function(resolve) {
        _testData[_patientIdInContext].contacts.push({isBeingAdded: true});
        return resolve();
      });
    }

    return {
      setPatientInContext: _setPatientInContext,
      getPatientData: _getPatientData,
      getPatientContacts: _getPatientContacts,
      deleteContact: _deleteContact,
      startAddingNewContact: _startAddingNewContact,
      clear: function() { /* mocked out as an example :) */ }
    };
  }]);
