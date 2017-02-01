package com.github.goteamepsilon.patientserv.model;

/**
 * Name, DOB, SSN, MaritalStat, Gender, Address, City, Post, State, Country, Phone, Email, Billing Notes, Other NOtes
 */

import org.immutables.value.Value;

@Value.Immutable
@IStyle
public abstract class AbstractPatient implements PatientCore {
  public abstract int getId();
}
