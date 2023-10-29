package net.gestionachat.entities;

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
public class LigneDevis {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long idLnDevis;
	private double qautite;
	private double prixUnitaire;
	private double montantTotal;
}
