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
public interface ContactDao {

  @SqlQuery("SELECT * FROM contacts")
  List<Contact> getAllContacts();


  @SingleValueResult
  @SqlQuery("SELECT * FROM contacts WHERE id = :id")
  Optional<Contact> getContactById(@Bind("id") int id);

  @SqlQuery("SELECT * FROM contacts WHERE pid = :pid")
  List<Contact> getContactByPid(@Bind("pid") int pid);

  @GetGeneratedKeys
  @SqlUpdate("INSERT INTO contacts (pid, name, relation, street_address, city, post_code, state, country, phone_number, email) " +
      "VALUES (:pid, :name, :relation, :street_address, :city, :post_code, :state, :country, :phone_number, :email)")
  int insertContact(@BindWithRosetta ContactEgg contactEgg);

  @SqlUpdate("UPDATE contacts SET name = pid = :pid, name = :name, relation = :relation, street_address = :street_address, " +
      "city = :city, post_code = :post_code, state = :state, country = :country, phone_number = :phone_number, email = :email" +
      "WHERE id = :id")
  void updateContact(@BindWithRosetta Contact contact);

  @SqlUpdate("DELETE FROM contacts WHERE id = :id")
  void deleteContactById(@Bind("id") int id);
}
