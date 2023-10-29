package net.gestionachat.service.interFace;

import jakarta.persistence.EntityNotFoundException;
import jakarta.persistence.criteria.CriteriaBuilder;
import net.gestionachat.dto.EvaluationFourDto;
import net.gestionachat.entities.EvaluationFournisseur;
import org.springframework.data.repository.query.Param;


import java.util.List;

public interface EvaluationService {

    EvaluationFourDto save(EvaluationFourDto dto);

    EvaluationFourDto findById(Long id) throws EntityNotFoundException;
    List<EvaluationFourDto> getEvaluationsByFournisseurId(Integer idfournisseur);

    List<EvaluationFourDto> findAll();
    public EvaluationFourDto  updateEvaluationFr(EvaluationFourDto dto);

  void deleteEvaluationFr(Long id);
   // public void deleteEvaluationFournisseur(Integer id);
}
