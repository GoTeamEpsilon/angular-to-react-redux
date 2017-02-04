package com.github.goteamepsilon.patientserv.config;

import java.util.Optional;

import org.skife.jdbi.v2.ContainerBuilder;
import org.skife.jdbi.v2.tweak.ContainerFactory;

public class OptionalContainerFactory implements ContainerFactory<Optional<?>> {

  @Override
  public boolean accepts(Class<?> type) {
    return Optional.class.isAssignableFrom(type);
  }

  @Override
  public ContainerBuilder<Optional<?>> newContainerBuilderFor(Class<?> type) {
    return new OptionalContainerBuilder();
  }

  private static class OptionalContainerBuilder implements ContainerBuilder<Optional<?>> {

    private Optional<?> optional = Optional.empty();

    @Override
    public ContainerBuilder<Optional<?>> add(Object o) {
      optional = Optional.ofNullable(o);
      return this;
    }

    @Override
    public Optional<?> build() {
      return optional;
    }
  }
}
