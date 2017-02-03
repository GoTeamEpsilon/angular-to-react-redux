package com.github.goteamepsilon.patientserv.model;

import java.util.Arrays;
import java.util.Map;
import java.util.Objects;

import com.google.common.collect.Maps;
import com.hubspot.rosetta.annotations.RosettaCreator;
import com.hubspot.rosetta.annotations.RosettaValue;

public enum Gender {
  MALE(0),
  FEMALE(1),
  TRANSGENDER_MALE(2),
  TRANSGENDER_FEMALE(3),
  INTERSEX(4),
  UNSPECIFIED(5);

  private static final Map<Integer, Gender> GENDER_MAP = Maps.uniqueIndex(Arrays.asList(values()), Gender::getId);
  private final int id;

  Gender(int id) {
    this.id = id;
  }

  @RosettaCreator
  public static Gender getGenderForId(int id) {
    return Objects.requireNonNull(GENDER_MAP.get(id));
  }

  @RosettaValue
  public int getId() {
    return id;
  }
}
