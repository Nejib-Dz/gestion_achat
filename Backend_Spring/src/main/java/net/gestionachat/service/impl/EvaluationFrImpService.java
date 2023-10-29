package net.gestionachat.service.impl;


import lombok.RequiredArgsConstructor;
import net.gestionachat.Exception.EntityNotFoundException;
import net.gestionachat.Exception.ErrorCodes;
import net.gestionachat.Exception.InvalidOperationException;
import net.gestionachat.dto.EvaluationFourDto;

import net.gestionachat.dto.FournisseurDto;
import net.gestionachat.entities.EvaluationFournisseur;

import net.gestionachat.entities.Fournisseur;
import net.gestionachat.repository.EvaluationFourRep;
import net.gestionachat.repository.FournisseurRep;
import net.gestionachat.service.interFace.EvaluationService;
import net.gestionachat.service.interFace.FourniseurService;
import net.gestionachat.validator.ObjectValidator;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EvaluationFrImpService implements EvaluationService {

    private final EvaluationFourRep evaluationFourRep;
    private  final FournisseurRep fournisseurRep;
    private final ObjectValidator<EvaluationFourDto> objectValidator;

    @Override
    public EvaluationFourDto save(EvaluationFourDto dto) {
        objectValidator.validate(dto);

        EvaluationFournisseur entity = EvaluationFourDto.toEntity(dto);

        EvaluationFournisseur savedEntity = evaluationFourRep.save(entity);

       // evaluationFourRep.save(EvaluationFourDto.toEntity(dto));
        return EvaluationFourDto.FromEntity(savedEntity);
    }

    @Override
    public EvaluationFourDto findById(Long id) throws EntityNotFoundException {
        EvaluationFournisseur evaluationFournisseur = evaluationFourRep.findById(id).orElse(null);
        if (evaluationFournisseur == null) {
            return null;
        }

        EvaluationFourDto evaluationFourDto = new EvaluationFourDto();
        BeanUtils.copyProperties(evaluationFournisseur, evaluationFourDto);


        return evaluationFourDto;
    }

    @Override
    public List<EvaluationFourDto> getEvaluationsByFournisseurId(Integer idfournisseur) {
        return  evaluationFourRep.getEvaluationsByFournisseurId(idfournisseur).stream()
                .map(EvaluationFourDto::FromEntity).collect(Collectors.toList());
    }

    @Override
    public List<EvaluationFourDto> findAll() {
        return  evaluationFourRep.findAll().stream()
                .map(EvaluationFourDto::FromEntity).collect(Collectors.toList());
    }

    @Override
    public EvaluationFourDto updateEvaluationFr(EvaluationFourDto dto) {
        objectValidator.validate(dto);

        // Trouver l'utilisateur dans la base de données en utilisant l'ID du DTO
        EvaluationFournisseur evaluationFournisseur = evaluationFourRep.findById(dto.getId())
                .orElseThrow(() -> new IllegalArgumentException("Fournisseur not found"));

        // Mettez à jour les propriétés de l'entité avec les valeurs du DTO

        evaluationFournisseur.setFiabilite(dto.getFiabilite());
        evaluationFournisseur.setDescription(dto.getDescription());
        evaluationFournisseur.setPerformance(dto.getPerformance());



        // ... autres propriétés à mettre à jour

        // Enregistrez les modifications dans la base de données
        evaluationFournisseur = evaluationFourRep.save(evaluationFournisseur);

        // Retournez le DTO mis à jour
        return EvaluationFourDto.FromEntity(evaluationFournisseur);
    }

    @Override
    public void deleteEvaluationFr(Long id)throws EntityNotFoundException {
        if (id == null) {
            throw new InvalidOperationException("ID is NULL", ErrorCodes.EVALUATION_ID_IS_NULL);
        }
        EvaluationFournisseur  evaluationFournisseur  = evaluationFourRep.findById(id).orElseThrow(()->new EntityNotFoundException(id+" not found",ErrorCodes.EVALUATION_NOT_FOUND));
        evaluationFourRep.deleteById(id);
    }


    }



