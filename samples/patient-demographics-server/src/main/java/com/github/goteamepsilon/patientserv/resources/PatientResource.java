package com.github.goteamepsilon.patientserv.resources;

import com.github.goteamepsilon.patientserv.model.Patient;
import com.github.goteamepsilon.patientserv.model.PatientEgg;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.Optional;

@Path("/patients")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class PatientResource {

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
