package net.gestionachat.repository;



import org.springframework.data.jpa.repository.JpaRepository;

import net.gestionachat.entities.DemandeAchat;

public interface DemandeAchatRep extends JpaRepository<DemandeAchat,Integer> {


}
