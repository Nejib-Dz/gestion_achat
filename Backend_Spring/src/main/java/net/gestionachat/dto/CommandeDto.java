package net.gestionachat.dto;


import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


import net.gestionachat.entities.Articles;
import net.gestionachat.entities.DemandeAchat;
import net.gestionachat.entities.Fournisseur;
import org.springframework.beans.BeanUtils;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.gestionachat.entities.Commande;




@AllArgsConstructor @NoArgsConstructor
@Data
public class CommandeDto {
   private String name;
	private Integer idCmd;
	private Date dateCmd;
	private String modePaiment;

	private Double montantToltal;
	 private String adresseLivraison;

	private List<DemandeAchatDto> demandeAchats;
	private List<FournisseurDto> fournisseurs;
	public static CommandeDto FromEntity(Commande entity) {

		CommandeDto commandeDto = new CommandeDto();
		BeanUtils.copyProperties(entity, commandeDto);
		List<DemandeAchatDto>  demandeAchatDto = entity.getDemandeAchats().stream()
				.map(DemandeAchatDto::FromEntity)
				.collect(Collectors.toList());
		commandeDto.setDemandeAchats(demandeAchatDto);
		List<FournisseurDto> fournisseurDtos = entity.getFournisseurs().stream()
				.map(FournisseurDto::fromEntity)
				.collect(Collectors.toList());
		commandeDto.setFournisseurs(fournisseurDtos);
		return commandeDto;

	}

	public static Commande toEntity(CommandeDto dto) {
		Commande commande = new Commande();
		BeanUtils.copyProperties(dto, commande);

		List<DemandeAchat> demandeAchats = dto.getDemandeAchats().stream()
				.map(DemandeAchatDto::toEntity)
				.collect(Collectors.toList());
		commande.setDemandeAchats(demandeAchats);

		List<Fournisseur> fournisseurs = Optional.ofNullable(dto.getFournisseurs())
				.orElse(Collections.emptyList())
				.stream()
				.map(FournisseurDto::toEntity)
				.collect(Collectors.toList());
		commande.setFournisseurs(fournisseurs);

		return commande;
	}

}
