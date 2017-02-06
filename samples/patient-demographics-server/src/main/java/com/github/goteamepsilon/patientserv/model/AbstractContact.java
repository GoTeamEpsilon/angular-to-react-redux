package com.github.goteamepsilon.patientserv.model;

import org.immutables.value.Value;

@Value.Immutable
@IStyle
public abstract class AbstractContact implements ContactCore{
  public abstract int getId();
}
