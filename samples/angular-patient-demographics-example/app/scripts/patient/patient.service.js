(function() {
  'use strict';

  angular
    .module('patientDemographicsExampleApp.patient')
    .factory('PatientService', PatientService);

  PatientService.$inject = ['$log', '$q'];

  function PatientService($log, $q) {
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
    var patientIdInContext = null;

    // Dummy data for patient because we don't have a server.
    var testData = {
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
          phone: 1234567899,
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
          phone: 1234567899,
          email: 'bar@foo.com'
        }, {
          name: 'Sam Doe',
          relation: 'Father',
          address: '123 Foobar Ln',
          city: 'CoolCity',
          postal: 12345,
          state: 'Texas',
          country: 'US',
          phone: 9876543211,
          email: 'baz@bop.com'
        }]
      }
    };

    // This needs to be called prior to any other call in this service.
    function setPatientInContext(patientId) {
      var deferred = $q.defer();

      logger.info('attempting to set patient context to patient ' + patientId);

      var res = testData[patientId];
      if (!res) {
        logger.warn('patient ' + patientId + ' doesn\'t exist');
        deferred.reject('patient doesn\'t exist');
      } else {
        patientIdInContext = patientId;
        deferred.resolve();
      }

      return deferred.promise;
    }

    function getPatientInContext() {
      return patientIdInContext;
    }

    // Basic data.
    function getPatientData() {
      logger.debug('retrieving patient basic data');

      return $q(function(resolve) {
        return resolve(testData[patientIdInContext].basic);
      });
    }

    // Contacts data.
    function getPatientContacts() {
      logger.debug('retrieving patient contacts data');
      return $q(function(resolve) {
        return resolve(testData[patientIdInContext].contacts);
      });
    }

    function deleteContact(contact) {
      logger.info('deleting contact "' + contact.relation + '"');
      return $q(function(resolve) {
        var contacts = testData[patientIdInContext].contacts;
        var matchIndex;
        contacts.some(function(element, index) {
          if (element.name === contact.name) {
            matchIndex = index;
            return true;
          }
        });

        if (matchIndex > -1) {
          contacts.splice(matchIndex, 1);
        }

        return resolve();
      });
    }

    // Adds a fresh object for a contact to be filled in.
    function startAddingNewContact() {
      logger.debug('Adding a fresh contact entry to be filled in');
      return $q(function(resolve) {
        testData[patientIdInContext].contacts.push({isBeingAdded: true});
        return resolve();
      });
    }

    return {
      setPatientInContext: setPatientInContext,
      getPatientInContext: getPatientInContext,
      getPatientData: getPatientData,
      getPatientContacts: getPatientContacts,
      deleteContact: deleteContact,
      startAddingNewContact: startAddingNewContact,
      clear: function() { /* mocked out as an example :) */ }
    };
  }
})();
