package net.gestionachat.dto;



import java.util.List;

import org.springframework.beans.BeanUtils;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.gestionachat.entities.LigneCommande;

@AllArgsConstructor @NoArgsConstructor
@Data
public class LigneCommandeDto {

	private Long idLigneCmd;
   private double quantite;
	private int numCommande;
	private int codeProduit;

	
	 
	 public static LigneCommandeDto FromEntity(LigneCommande entity) {
		  
		 LigneCommandeDto lignecommandeDto =new LigneCommandeDto();
		 BeanUtils.copyProperties(entity,lignecommandeDto);
		  return lignecommandeDto;
		  
		  } public static LigneCommande toEntity(LigneCommandeDto dto) {
			  LigneCommande lignecommande=new LigneCommande();
		  BeanUtils.copyProperties(dto,lignecommande);
		  return lignecommande;
		  
		  }
}
