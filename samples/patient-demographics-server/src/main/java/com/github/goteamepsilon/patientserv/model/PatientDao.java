/**
 * Name, DOB, SSN, MaritalStat, Gender, Address, City, Post, State, Country, Phone, Email, Billing Notes, Other NOtes
 */

package com.github.goteamepsilon.patientserv.model;

import java.util.List;
import java.util.Optional;

import org.skife.jdbi.v2.sqlobject.Bind;
import org.skife.jdbi.v2.sqlobject.GetGeneratedKeys;
import org.skife.jdbi.v2.sqlobject.SqlQuery;
import org.skife.jdbi.v2.sqlobject.SqlUpdate;
import org.skife.jdbi.v2.sqlobject.customizers.RegisterMapperFactory;
import org.skife.jdbi.v2.sqlobject.customizers.SingleValueResult;

import com.hubspot.rosetta.jdbi.BindWithRosetta;
import com.hubspot.rosetta.jdbi.RosettaMapperFactory;


@RegisterMapperFactory(RosettaMapperFactory.class)
public interface PatientDao {

  @SqlQuery("SELECT * FROM patients")
  List<Patient> getAllPatients();

  @SingleValueResult
  @SqlQuery("SELECT * FROM patients WHERE id = :id")
  Optional<Patient> getPatientById(@Bind("id") int id);

   @GetGeneratedKeys
   @SqlUpdate("INSERT INTO patients (name, dob, ssn, marital_status, gender, street_address, city, post_code, " +
       "state, country, phone_number, email, billing_notes, patient_notes) " +
       "VALUES (:name, :dob, :ssn, :marital_status, :gender, :street_address, :city, :post_code, " +
       ":state, :country, :phone_number, :email, :billing_notes, :patient_notes)")
   int insertPatient(@BindWithRosetta PatientEgg patientEgg);

  @SqlUpdate("DELETE FROM expenses WHERE id = :id")
  void deletePatientById(@Bind("id") int id);
}
