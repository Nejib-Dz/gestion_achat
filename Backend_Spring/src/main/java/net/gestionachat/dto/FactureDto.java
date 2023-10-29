package net.gestionachat.dto;

import java.util.Date;

import org.springframework.beans.BeanUtils;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.gestionachat.entities.Facture;

@AllArgsConstructor @NoArgsConstructor
@Data
public class FactureDto {
	 private Long idFacture;
	 private int numFacture;
	 private Date dateFacture;
	 private String etatFacture;
	 private String methodePay;
	 private String refFournisseur;
	
	 public static FactureDto FromEntity(Facture entity) {
		  
		 FactureDto factureDto =new FactureDto();
		 BeanUtils.copyProperties(entity,factureDto);
		  return factureDto;
		  
		  } public static Facture toEntity(FactureDto dto) {
			  Facture facture=new Facture();
		  BeanUtils.copyProperties(dto,facture);
		  return facture;
		  
		  }
}
