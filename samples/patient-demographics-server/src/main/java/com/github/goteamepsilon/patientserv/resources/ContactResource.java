package com.github.goteamepsilon.patientserv.resources;


import java.util.List;
import java.util.Optional;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import com.github.goteamepsilon.patientserv.model.Contact;
import com.github.goteamepsilon.patientserv.data.ContactDao;
import com.github.goteamepsilon.patientserv.model.ContactEgg;
import com.google.inject.Inject;

@Path("/contacts")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ContactResource {

  private final ContactDao contactDao;

  @Inject
  public ContactResource(ContactDao contactDao) {
    this.contactDao = contactDao;
  }

  @GET
  public List<Contact> readAllContacts() {
    return contactDao.getAllContacts();
  }

  @GET
  @Path("for-patient/{pid}")
  public List<Contact> readContactByPid(@PathParam("pid") int pid) {
    return contactDao.getContactByPid(pid);
  }

  @GET
  @Path("{id}")
  public Optional<Contact> readContactById(@PathParam("id") int id) {
    return contactDao.getContactById(id);
  }

  @POST
  public Contact createContact(ContactEgg contactEgg) {
    int id = contactDao.insertContact(contactEgg);
    return contactDao.getContactById(id).get();
  }

  @PUT
  public void updateExistingContact(Contact contact) {
    contactDao.updateContact(contact);
  }

  @DELETE
  @Path("{id}")
  public void deleteContact(@PathParam("id") int id) {
    contactDao.deleteContactById(id);
  }
}
