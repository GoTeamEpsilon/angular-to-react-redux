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

import com.github.goteamepsilon.patientserv.model.Patient;
import com.github.goteamepsilon.patientserv.model.PatientDao;
import com.github.goteamepsilon.patientserv.model.PatientEgg;
import com.google.inject.Inject;

@Path("/patients")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class PatientResource {

  private final PatientDao patientDao;

  @Inject
  public PatientResource(PatientDao patientDao) {
    this.patientDao = patientDao;
  }

  @GET
  public List<Patient> readAllPatients() {
    return patientDao.getAllPatients();
  }

  @GET
  @Path("{pid}")
  public Optional<Patient> readPatientById(@PathParam("pid") int pid) {
    return patientDao.getPatientById(pid);
  }

  @POST
  public Patient createPatient(PatientEgg patientEgg) {
    int patientId = patientDao.insertPatient(patientEgg);
    return patientDao.getPatientById(patientId).get();
  }

  @PUT
  public void updateExistingPatient(Patient patient) {
    patientDao.updatePatient(patient);
  }

  @DELETE
  @Path("{pid}")
  public void deletePatient(@PathParam("pid") int id) {
    patientDao.deletePatientById(id);
  }
}
