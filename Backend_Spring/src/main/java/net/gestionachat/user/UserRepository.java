package net.gestionachat.user;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {

  Optional<User> findByEmail(String email);


  User findByEmailIgnoreCase(String emailId);

  Boolean existsByEmail(String email);

  User findByPasswordResetToken(String passwordResetToken);
}
