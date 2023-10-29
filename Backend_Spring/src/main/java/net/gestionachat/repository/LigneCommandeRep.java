package net.gestionachat.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import net.gestionachat.entities.LigneCommande;



public interface LigneCommandeRep extends JpaRepository<LigneCommande, Long>{

}
