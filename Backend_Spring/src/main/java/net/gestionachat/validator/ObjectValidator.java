
  package net.gestionachat.validator;

  import jakarta.validation.ConstraintViolation;
  import jakarta.validation.Validation;
  import jakarta.validation.Validator;
  import jakarta.validation.ValidatorFactory;
  import net.gestionachat.Exception.ObjectValidatorException;
  import org.springframework.stereotype.Component;


  import java.util.Set;
  import java.util.stream.Collectors;

  @Component public class ObjectValidator <T> { private final ValidatorFactory
  factory = Validation.buildDefaultValidatorFactory(); private final Validator
  validator = factory.getValidator();

  public void validate(T objectValidateReference){ Set<ConstraintViolation<T>>
  violations = validator.validate(objectValidateReference);
  if(!violations.isEmpty()){ Set<String> errorMessages =
  violations.stream().map(ConstraintViolation::getMessage).collect(Collectors.
  toSet()); throw new
      ObjectValidatorException(errorMessages,objectValidateReference.getClass().
  getSimpleName()); } }

  }

