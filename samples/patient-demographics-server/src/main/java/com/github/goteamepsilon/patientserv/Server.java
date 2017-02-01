package com.github.goteamepsilon.patientserv;

import com.github.goteamepsilon.patientserv.config.ServerConfiguration;
import com.github.goteamepsilon.patientserv.config.ServerModule;
import com.hubspot.dropwizard.guicier.GuiceBundle;

import io.dropwizard.Application;
import io.dropwizard.setup.Bootstrap;
import io.dropwizard.setup.Environment;

public class Server extends Application<ServerConfiguration> {

  public static void main(String[] args) throws Exception {
    new Server().run(args);
  }

  @Override
  public void run(ServerConfiguration serverConfiguration, Environment environment) throws Exception {

  }

  @Override
  public void initialize(Bootstrap<ServerConfiguration> bootstrap) {
    GuiceBundle<ServerConfiguration> guiceBundle = GuiceBundle.defaultBuilder(ServerConfiguration.class)
        .modules(new ServerModule())
        .build();
    bootstrap.addBundle(guiceBundle);
  }
}
