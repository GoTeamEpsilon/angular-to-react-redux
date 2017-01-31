package com.github.goteamepsilon.patientserv;

import org.immutables.value.Value;

@Value.Immutable
@IStyle
public abstract class AbstractPatientEgg {
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
