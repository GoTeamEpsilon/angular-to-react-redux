package com.github.goteamepsilon.patientserv.config;

import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.module.SimpleModule;

public class LowerCaseWithUnderscoresModule extends SimpleModule {

  @Override
  public void setupModule(SetupContext setupContext) {
    setupContext.setNamingStrategy(new PropertyNamingStrategy.SnakeCaseStrategy());
  }
}
