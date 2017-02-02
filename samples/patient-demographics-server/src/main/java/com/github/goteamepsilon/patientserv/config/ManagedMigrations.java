package com.github.goteamepsilon.patientserv.config;

import java.sql.Connection;

import org.skife.jdbi.v2.DBI;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.google.inject.Inject;
import com.google.inject.Singleton;
import com.google.inject.name.Named;

import io.dropwizard.lifecycle.Managed;
import liquibase.Contexts;
import liquibase.Liquibase;
import liquibase.database.jvm.JdbcConnection;
import liquibase.resource.ClassLoaderResourceAccessor;

@Singleton
public class ManagedMigrations implements Managed{
  private static final Logger LOG = LoggerFactory.getLogger(ManagedMigrations.class);

  private final JdbcConnection connection;

  @Inject
  public ManagedMigrations(@Named("migration.connection") Connection connection) {
    this.connection = new JdbcConnection(connection);
  }

  @Override
  public void start() throws Exception {
    LOG.info("Starting database migrations");
    try {
      new Liquibase("migrations.xml", new ClassLoaderResourceAccessor(ManagedMigrations.class.getClassLoader()), connection)
          .update(new Contexts(""));
    } catch (Exception e) {
      throw new RuntimeException(e);
    }
  }

  @Override
  public void stop() throws Exception {

  }
}
