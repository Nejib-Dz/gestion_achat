package net.gestionachat.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import net.gestionachat.entities.EvaluationFournisseur;

import net.gestionachat.entities.Fournisseur;
import org.springframework.beans.BeanUtils;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class EvaluationFourDto {

    private Long id;
    private String performance;
    private String fiabilite;

    private String description;
    private FournisseurDto fournisseur;


    public static EvaluationFourDto FromEntity(EvaluationFournisseur entity) {

        EvaluationFourDto evaluationFourDto = new EvaluationFourDto();
//        FournisseurDto fournisseurDto = FournisseurDto.fromEntity(entity.getFournisseur());
//       evaluationFourDto.setFournisseur(fournisseurDto);

        BeanUtils.copyProperties(entity, evaluationFourDto);
        return evaluationFourDto;

    }

    public static EvaluationFournisseur toEntity(EvaluationFourDto dto) {

        EvaluationFournisseur evaluationFournisseur = new EvaluationFournisseur();
        BeanUtils.copyProperties(dto, evaluationFournisseur);
      evaluationFournisseur.setFournisseur(FournisseurDto.toEntity(dto.getFournisseur()));

        return evaluationFournisseur;

    }
}
