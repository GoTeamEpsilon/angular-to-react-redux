package com.github.goteamepsilon.patientserv.config;

import com.github.goteamepsilon.patientserv.resources.PatientResource;
import com.google.inject.Binder;
import com.hubspot.dropwizard.guicier.DropwizardAwareModule;

public class ServerModule extends DropwizardAwareModule<ServerConfiguration> {
	@Override
	public void configure(Binder binder) {
		binder.bind(PatientResource.class);
	}
}
