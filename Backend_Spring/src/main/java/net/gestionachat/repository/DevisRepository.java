package net.gestionachat.repository;

import net.gestionachat.entities.Commande;
import net.gestionachat.entities.Devis;
import org.springframework.data.jpa.repository.JpaRepository;
//Added
public interface DevisRepository extends JpaRepository<Devis, Integer> {
}
