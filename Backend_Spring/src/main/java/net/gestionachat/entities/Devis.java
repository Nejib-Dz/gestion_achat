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
public class Devis {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer idDevis;
	private Date dateCreeDevis;
	private Date dateValidDevis;
	private double montanTotal;
	private String formFournisseur;
	private String article;
	private String statutDevis;
}
