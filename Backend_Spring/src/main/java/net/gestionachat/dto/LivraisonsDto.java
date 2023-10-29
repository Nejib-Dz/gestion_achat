package net.gestionachat.dto;

import java.util.Date;
import java.util.List;

import org.springframework.beans.BeanUtils;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.gestionachat.entities.Livraisons;


@AllArgsConstructor @NoArgsConstructor
@Data
public class LivraisonsDto {

	private Long idLivraison;
	private Date dateLivraison;
	private String addresse;
	private String statut;
	private String refCommnade;
	
	
	
	 public static LivraisonsDto FromEntity(Livraisons entity) {
		  
		 LivraisonsDto livraisonsDto =new LivraisonsDto();
		 BeanUtils.copyProperties(entity,livraisonsDto);
		  return livraisonsDto;
		  
		  } public static Livraisons toEntity(LivraisonsDto dto) {
			  Livraisons livraisons=new Livraisons();
		  BeanUtils.copyProperties(dto,livraisons);
		  return livraisons;
		  
		  }
}
