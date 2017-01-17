(function() {
  'use strict';

  describe('PatientService', function () {
    var patientService;
    var testPatientId = 1337;
    var rootScope;

    beforeEach(module('patientDemographicsExampleApp'));

    beforeEach(inject(function(_PatientService_, $rootScope) {
      patientService = _PatientService_;
      rootScope = $rootScope;
    }));

    describe('setPatientInContext', function() {
      describe('valid patient', function() {
        beforeEach(function() {
          patientService.setPatientInContext(testPatientId);
        });

        it('is now in context', function() {
          expect(patientService.getPatientInContext()).toBe(testPatientId);
        });
      });

      describe('invalid patient', function() {
        beforeEach(function() {
          patientService.setPatientInContext(9001);
        });

        it('is not in context', function() {
          expect(patientService.getPatientInContext()).toBe(null);
        });
      });
    });

    describe('getPatientData', function() {
      beforeEach(function() {
        patientService.setPatientInContext(testPatientId);
      });

      it('returns the correct basic structure', function(done) {
        patientService.getPatientData()
          .then(function(res) {
            var returnedKeys = Object.keys(res).sort();

            var expectedKeys = [
              'name',
              'dob',
              'ss',
              'martialStatus',
              'gender',
              'billingNote',
              'otherNote',
              'address',
              'city',
              'postal',
              'state',
              'country',
              'phone',
              'email'
            ].sort();

            expect(returnedKeys).toEqual(expectedKeys);
            done();
          });
        rootScope.$digest();
      });
    });

    describe('getPatientContacts', function() {
      beforeEach(function() {
        patientService.setPatientInContext(testPatientId);
      });

      it('is a list of contacts', function(done) {
        patientService.getPatientContacts()
          .then(function(res) {
            expect(res.length).toBe(2);
            done();
          });
        rootScope.$digest();
      });

      it('returns the correct contacts structure', function(done) {
        patientService.getPatientContacts()
          .then(function(res) {
            var returnedKeys = Object.keys(res[0]).sort();

            var expectedKeys = [
              'name',
              'relation',
              'address',
              'city',
              'postal',
              'state',
              'country',
              'phone',
              'email'
            ].sort();

            expect(returnedKeys).toEqual(expectedKeys);
            done();
          });
        rootScope.$digest();
      });
    });

    describe('startAddingNewContact', function() {
      beforeEach(function() {
        patientService.setPatientInContext(testPatientId);
      });

      it('pushes a fresh object to the contact list', function(done) {
        patientService.startAddingNewContact()
          .then(function() {
            return patientService.getPatientContacts();
          })
          .then(function(res) {
            var match = res.filter(function(contact) {
              return contact.isBeingAdded === true;
            });

            expect(match).toEqual([{isBeingAdded: true}]);
            done();
          });
        rootScope.$digest();
      });
    });

    describe('deleteContact', function() {
      describe('when the contact to be deleted exists', function() {
        var testContact = {
          name: 'Jane Doe',
          relation: 'Mother',
          address: '123 Foobar Ln',
          city: 'CoolCity',
          postal: 12345,
          state: 'Texas',
          country: 'US',
          phone: 1231231234,
          email: 'bar@foo.com'
        };

        beforeEach(function() {
          patientService.setPatientInContext(testPatientId);
        });

        it('removes the contact object from the list', function(done) {
          patientService.deleteContact(testContact)
            .then(function() {
              return patientService.getPatientContacts();
            })
            .then(function(res) {
              var match = res.filter(function(contact) {
                return contact.name === testContact.name;
              });

              expect(match).toEqual([]);
              done();
            });
          rootScope.$digest();
        });
      });

      describe('when the contact to be deleted doesn\'t exist', function() {
        var testContact = {
          name: 'I Don\'t Exist :(',
          relation: 'Nobody',
          address: 'Nowhere',
          city: 'Notown',
          postal: 11111,
          state: 'stateless',
          country: 'NA',
          phone: 1111111111,
          email: 'null@nil.com'
        };

        beforeEach(function() {
          patientService.setPatientInContext(testPatientId);
        });

        it('no contacts are removed from the list', function(done) {
          patientService.deleteContact(testContact)
            .then(function() {
              return patientService.getPatientContacts();
            })
            .then(function(res) {
              expect(res.length).toBe(2);
              done();
            });
          rootScope.$digest();
        });
      });
    });
  });
})();
