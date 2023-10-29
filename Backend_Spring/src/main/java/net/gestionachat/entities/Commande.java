package net.gestionachat.entities;



import java.util.Date;
import java.util.List;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Entity
@AllArgsConstructor @NoArgsConstructor
@Data
public class Commande {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer idCmd;
	private Date dateCmd;
	private String modePaiment;
	private Double montantToltal = 0.0;
	 private String adresseLivraison;
	private String name;

	@ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
	@JoinTable(	name = "commande_demandeAchats",
			joinColumns = @JoinColumn(name = "commande_id"),
			inverseJoinColumns = @JoinColumn(name = "demandeAchats_id"))
	private List<DemandeAchat> demandeAchats;
	@ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
	@JoinTable(	name = "commande_fournisseur",
			joinColumns = @JoinColumn(name = "commande_id"),
			inverseJoinColumns = @JoinColumn(name = "fournisseur_id"))
	private List<Fournisseur> fournisseurs;


	@PrePersist
	public void calculTotal(){
		for (DemandeAchat demande : demandeAchats){
			for(Articles article : demande.getArticles()){
             this.montantToltal = this.montantToltal + article.getPrice();
			}
		}

	}


}
