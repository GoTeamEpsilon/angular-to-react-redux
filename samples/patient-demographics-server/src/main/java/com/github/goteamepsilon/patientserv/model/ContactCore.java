package com.github.goteamepsilon.patientserv.model;

public interface ContactCore {
  int getPid();
  String getName();
  String getRelation();
  String getStreetAddress();
  String getCity();
  int getPostCode();
  String getState();
  String getCountry();
  int getPhoneNumber();
  String getEmail();
}
