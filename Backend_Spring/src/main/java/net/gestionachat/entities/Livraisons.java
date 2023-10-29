package net.gestionachat.entities;

import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Entity
@AllArgsConstructor @NoArgsConstructor
@Data
public class Livraisons {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long idLivraison;
	private Date dateLivraison;
	private String addresse;
	private String statut;
	private String refCommnade;
	
}
