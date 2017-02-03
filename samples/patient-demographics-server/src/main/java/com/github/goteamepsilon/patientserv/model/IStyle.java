package com.github.goteamepsilon.patientserv.model;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import org.immutables.value.Value;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;

@Target({ ElementType.PACKAGE, ElementType.TYPE})
@Retention(RetentionPolicy.CLASS) // Make it class retention for incremental compilation
@JsonSerialize
@Value.Style(
    get = {"is*", "get*"}, // Detect 'get' and 'is' prefixes in accessor methods
    init = "set*", // Builder initialization methods will have 'set' prefix
    typeAbstract = {"Abstract*", "*IF"}, // 'Abstract' prefix, and 'IF' suffix, will be detected and trimmed
    typeImmutable = "*", // No prefix or suffix for generated immutable type
    buildOrThrow = "buildOrThrow", // ability to throw a specific exception on failure to build
    optionalAcceptNullable = true, // allow for an Optional<T> to have a setter that takes a null value of T
    forceJacksonPropertyNames = false, //To allow for naming strategies
    visibility = Value.Style.ImplementationVisibility.SAME) // Generated class will have the same visibility as the abstract class/interface)
public @interface IStyle {
}
