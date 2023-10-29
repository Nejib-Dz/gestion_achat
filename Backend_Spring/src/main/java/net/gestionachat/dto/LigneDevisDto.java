package net.gestionachat.dto;

import org.springframework.beans.BeanUtils;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.gestionachat.entities.LigneDevis;

@AllArgsConstructor @NoArgsConstructor
@Data
public class LigneDevisDto {

	private Long idLnDevis;
	private double qautite;
	private double prixUnitaire;
	private double montantTotal;
	
	 public static LigneDevisDto FromEntity(LigneDevis entity) {
		  
		 LigneDevisDto ligneDevisDto =new LigneDevisDto();
		 BeanUtils.copyProperties(entity,ligneDevisDto);
		  return ligneDevisDto;
		  
		  } public static LigneDevis toEntity(LigneDevisDto dto) {
			  LigneDevis ligneDevis=new LigneDevis();
		  BeanUtils.copyProperties(dto,ligneDevis);
		  return ligneDevis;
		  
		  }
}
