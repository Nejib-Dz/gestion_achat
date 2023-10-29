package net.gestionachat.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import net.gestionachat.entities.Articles;
import net.gestionachat.entities.DemandeAchat;

import net.gestionachat.user.User;
import org.springframework.beans.BeanUtils;


import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor @NoArgsConstructor
@Data
public class DemandeAchatDto {

    private Integer id;

    private Date dateDemande;
    private Date dateApprobation;
    private double qteDemandee;
    private double  qteApprouvee;
    private String name;
    private String description;
    private String delais;
    private String etat;
    private String motifRejet;
    private UserDto userDemandeur;
    private UserDto userApprouvant;
    private List<ArticleDto> articles ;

public static DemandeAchatDto FromEntity(DemandeAchat entity) {
    DemandeAchatDto demandeAchatDto = new DemandeAchatDto();
    BeanUtils.copyProperties(entity, demandeAchatDto);

    List<ArticleDto> articleDtos = entity.getArticles().stream()
            .map(ArticleDto::FromEntity)
            .collect(Collectors.toList());
      demandeAchatDto.setArticles(articleDtos);
    UserDto userDemandeurDto = UserDto.FromEntity(entity.getUserDemandeur());
//    UserDto userApprouvantDto = UserDto.FromEntity(entity.getUserApprouvant());
    demandeAchatDto.setUserDemandeur(userDemandeurDto);
//    demandeAchatDto.setUserApprouvant(userApprouvantDto);
    return demandeAchatDto;
}
        public static DemandeAchat toEntity(DemandeAchatDto dto) {
        DemandeAchat demandeAchat=new DemandeAchat();
        BeanUtils.copyProperties(dto,demandeAchat);
            List<Articles> articles = dto.getArticles().stream()
                    .map(ArticleDto::toEntity)
                    .collect(Collectors.toList());
            demandeAchat.setArticles(articles);
            User userDemandeur = UserDto.toEntity(dto.getUserDemandeur());
//            User userApprouvant = UserDto.toEntity(dto.getUserApprouvant());
            demandeAchat.setUserDemandeur(userDemandeur);
//            demandeAchat.setUserApprouvant(userApprouvant);

        return demandeAchat;

    }
}
