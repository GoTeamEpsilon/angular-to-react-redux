package com.github.goteamepsilon.patientserv.model;

import java.util.Arrays;
import java.util.Map;
import java.util.Objects;

import com.google.common.collect.Maps;
import com.hubspot.rosetta.annotations.RosettaCreator;
import com.hubspot.rosetta.annotations.RosettaValue;

public enum MaritalStatus {
  SINGLE(0),
  MARRIED(1),
  DIVORCED(2),
  DOMESTIC_PARTNER(3),
  WIDOWED(4);

  private static final Map<Integer, MaritalStatus> MARITAL_STATUS_MAP = Maps.uniqueIndex(Arrays.asList(values()), MaritalStatus::getId);
  private final int id;

  MaritalStatus(int id) {
    this.id = id;
  }

  @RosettaCreator
  public static MaritalStatus getMaritalStatusId(int id) {
    return Objects.requireNonNull(MARITAL_STATUS_MAP.get(id));
  }

  @RosettaValue
  public int getId() {
    return id;
  }
}
