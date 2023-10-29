package net.gestionachat.dto;

import jakarta.validation.constraints.Email;
import net.gestionachat.entities.Commande;
import net.gestionachat.entities.DemandeAchat;
import net.gestionachat.entities.EvaluationFournisseur;
import org.springframework.beans.BeanUtils;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import net.gestionachat.entities.Fournisseur;

import java.util.List;
import java.util.stream.Collectors;


@AllArgsConstructor @NoArgsConstructor
@Getter @Setter
public class FournisseurDto {

     private Integer id;
	private String name;
	@Email
	private String email;
	private String tele;
	//private String address;
	private String country;

	//private Boolean valide;
//	private Commande commande;
	private List<EvaluationFourDto> evaluations;
	  public static FournisseurDto fromEntity(Fournisseur entity) {

		  FournisseurDto fournisseurDto =new FournisseurDto();
		        BeanUtils.copyProperties(entity,fournisseurDto);
		  if (entity.getEvaluations() != null) {
			  List<EvaluationFourDto> evaluationFournisseurs = entity.getEvaluations().stream()
					  .map(EvaluationFourDto::FromEntity)
					  .collect(Collectors.toList());
			  fournisseurDto.setEvaluations(evaluationFournisseurs);
			  return fournisseurDto;
		  }
		        return fournisseurDto;

		    }

		    public static Fournisseur toEntity(FournisseurDto dto) {
		    	Fournisseur fournisseur=new Fournisseur();
		        BeanUtils.copyProperties(dto,fournisseur);
				if (dto.getEvaluations() != null) {
					List<EvaluationFournisseur> evaluationFournisseurs = dto.getEvaluations().stream()
							.map(EvaluationFourDto::toEntity)
							.collect(Collectors.toList());
					fournisseur.setEvaluations(evaluationFournisseurs);
					return fournisseur;
				}

				return fournisseur;

		    }


}
