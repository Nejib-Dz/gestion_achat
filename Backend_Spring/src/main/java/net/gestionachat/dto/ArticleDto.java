package net.gestionachat.dto;

import java.io.IOException;
import java.util.Date;


import com.fasterxml.jackson.databind.ObjectMapper;
import net.gestionachat.entities.Commande;
import net.gestionachat.entities.DemandeAchat;
import org.springframework.beans.BeanUtils;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.gestionachat.entities.Articles;


@AllArgsConstructor @NoArgsConstructor
@Data
public class ArticleDto {


	private Long id;
	private String name;
	private double price;
	private String description;
	private Integer quantity;
	private double taxPercent;
	private Integer stock ;
	private String brand;
	private Integer reserved;
   private String cost;
	private Date dateAdded;
	private boolean active;
	private DemandeAchat demandeAchat;


	
	 public static ArticleDto FromEntity(Articles entity) {
		  
		 ArticleDto articleDto =new ArticleDto();
		 BeanUtils.copyProperties(entity,articleDto);
		  return articleDto;
		  
		  } public static Articles toEntity(ArticleDto dto) {
			  Articles articles=new Articles();
		  BeanUtils.copyProperties(dto,articles);
		  return articles;
		  
		  }


}
