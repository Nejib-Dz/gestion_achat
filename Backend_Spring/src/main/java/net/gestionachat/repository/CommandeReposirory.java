package net.gestionachat.repository;
import net.gestionachat.entities.Commande;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
//Added
@Repository
public interface CommandeReposirory extends JpaRepository<Commande, Integer> {
}
