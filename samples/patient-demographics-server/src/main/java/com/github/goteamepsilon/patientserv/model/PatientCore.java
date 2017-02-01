package com.github.goteamepsilon.patientserv.model;

public interface PatientCore {
  String getName();
  String getDob();
  int getSsn();
  MaritalStatus getMaritalStatus();
  Gender getGender();
  String getStreetAddress();
  String getCity();
  int getPostCode();
  String getState();
  String getCountry();
  int getPhoneNumber();
  String getEmail();
  String getBillingNotes();
  String getPatientNotes();
}
