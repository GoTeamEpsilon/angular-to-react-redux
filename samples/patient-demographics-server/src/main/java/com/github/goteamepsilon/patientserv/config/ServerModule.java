package com.github.goteamepsilon.patientserv.config;

import java.sql.Connection;
import java.sql.DriverManager;

import org.skife.jdbi.v2.DBI;

import com.github.goteamepsilon.patientserv.model.PatientDao;
import com.github.goteamepsilon.patientserv.resources.PatientResource;
import com.google.inject.Binder;
import com.google.inject.Provides;
import com.google.inject.Singleton;
import com.google.inject.name.Named;
import com.hubspot.dropwizard.guicier.DropwizardAwareModule;
import com.hubspot.rosetta.Rosetta;

public class ServerModule extends DropwizardAwareModule<ServerConfiguration> {

  @Override
  public void configure(Binder binder) {
    // Resources
    binder.bind(PatientResource.class);

    // Lifecycle
    binder.bind(ManagedMigrations.class);

    // Rosetta
    Rosetta.addModule(new LowerCaseWithUnderscoresModule());
  }

  @Provides
  @Singleton
  @Named("server.jdbc.url")
  public String providesJdbcUrl() {
    return System.getenv("JDBC_DATABASE_URL");
  }

  @Provides
  @Singleton
  public DBI providesDbi(@Named("server.jdbc.url") String jdbcUrl) {
    DBI dbi = new DBI(jdbcUrl);
    dbi.registerContainerFactory(new OptionalContainerFactory());
    return dbi;
  }

  @Provides
  @Singleton
  @Named("migration.connection")
  public Connection providesDatabaseConnection(@Named("server.jdbc.url") String jdbcUrl) {
    try {
      return DriverManager.getConnection(jdbcUrl);
    } catch (Exception e) {
      throw new RuntimeException(e);
    }
  }

  @Provides
  public PatientDao providePatientDao(DBI dbi) {
    return dbi.onDemand(PatientDao.class);
  }
}
