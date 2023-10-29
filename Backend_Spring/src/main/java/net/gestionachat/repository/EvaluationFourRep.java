package net.gestionachat.repository;

import net.gestionachat.dto.EvaluationFourDto;
import net.gestionachat.entities.EvaluationFournisseur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface EvaluationFourRep extends JpaRepository<EvaluationFournisseur ,Long> {
    @Query("SELECT e FROM EvaluationFournisseur e WHERE e.fournisseur.id = :idfournisseur")
    List<EvaluationFournisseur> getEvaluationsByFournisseurId(@Param("idfournisseur") Integer idfournisseur);


}
