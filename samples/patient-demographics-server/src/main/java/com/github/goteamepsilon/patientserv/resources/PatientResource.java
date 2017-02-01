package com.github.goteamepsilon.patientserv.resources;

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
import com.github.goteamepsilon.patientserv.model.PatientEgg;
import com.google.inject.Inject;

@Path("/patients")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class PatientResource {

  @Inject
  public PatientResource() {

  }

  @GET
  @Path("{pid}")
  public Optional<Patient> readPatientById(@PathParam("pid") int pid) {
    return Optional.empty();
  }

  @POST
  public Patient createPatient(PatientEgg patientEgg) {
    return Patient.builder().from(patientEgg).setId(1).build();
  }

  @PUT
  public Patient updateExistingPatient(Patient patient) {
    return patient;
  }

  @DELETE
  @Path("{pid}")
  public void deletePatient(@PathParam("pid") int pid) {

  }
}
