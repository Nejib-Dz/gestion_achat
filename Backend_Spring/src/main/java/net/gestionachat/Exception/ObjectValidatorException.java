package net.gestionachat.Exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.Set;
@RequiredArgsConstructor
@Getter

public class ObjectValidatorException extends RuntimeException{

	 private final Set<String> errorMessages;

	    private final String validationSource;

}
