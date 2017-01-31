package com.github.goteamepsilon.patientserv;

/**
 * Name, DOB, SSN, MaritalStat, Gender, Address, City, Post, State, Country, Phone, Email, Billing Notes, Other NOtes
 */

import org.immutables.value.Value;

@Value.Immutable
@IStyle
public abstract class AbstractPatient {

  public abstract int getId();

  public abstract String getName();
  public abstract String getDob();
  public abstract int getSsn();
  public abstract MaritalStatus getMaritalStatus();
  public abstract Gender getGender();
  public abstract String getStreetAddress();
  public abstract String getCity();
  public abstract int getPostCode();
  public abstract String getState();
  public abstract String getCountry();
  public abstract int getPhoneNumber();
  public abstract String getEmail();
  public abstract String getBillingNotes();
  public abstract String getPatientNotes();
}
