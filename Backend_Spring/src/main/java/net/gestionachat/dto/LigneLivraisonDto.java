package net.gestionachat.dto;

import java.util.Date;

import org.springframework.beans.BeanUtils;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.gestionachat.entities.LigneLivraison;

@AllArgsConstructor @NoArgsConstructor
@Data
public class LigneLivraisonDto {

	private Long idLnLivraisons;
	private double quantiteLivree;
	private Date dateLivraisons;
	private String statutLivraisons;
	
	 public static LigneLivraisonDto FromEntity(LigneLivraison entity) {
		  
		 LigneLivraisonDto ligneLivraisonDto =new LigneLivraisonDto();
		 BeanUtils.copyProperties(entity,ligneLivraisonDto);
		  return ligneLivraisonDto;
		  
		  } public static LigneLivraison toEntity(LigneLivraisonDto dto) {
			  LigneLivraison ligneLivraison=new LigneLivraison();
		  BeanUtils.copyProperties(dto,ligneLivraison);
		  return ligneLivraison;
		  
		  }
}
