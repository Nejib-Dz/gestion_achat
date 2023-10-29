package net.gestionachat.dto;

import java.util.Date;

import org.springframework.beans.BeanUtils;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.gestionachat.entities.Devis;

@AllArgsConstructor @NoArgsConstructor
@Data
public class DevisDto {
	private Integer idDevis;
	private Date dateCreeDevis;
	private Date dateValidDevis;
	private double montanTotal;
	private String formFournisseur;
	private String article;
	private String statutDevis;
	
	 public static DevisDto FromEntity(Devis entity) {
		  
		 DevisDto devisDto =new DevisDto();
		 BeanUtils.copyProperties(entity,devisDto);
		  return devisDto;
		  
		  } public static Devis toEntity(DevisDto dto) {
			  Devis devis=new Devis();
		  BeanUtils.copyProperties(dto,devis);
		  return devis;
		  
		  }
}
