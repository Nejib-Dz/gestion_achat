package net.gestionachat.token;

import org.springframework.data.jpa.repository.JpaRepository;
import net.gestionachat.token.ConfirmationToken;

public interface ConfirmationTokenRepository extends JpaRepository<ConfirmationToken , Long>{
    ConfirmationToken findByConfirmationToken(String confirmationToken);
    ConfirmationToken findByUserId(Integer userId);

}
