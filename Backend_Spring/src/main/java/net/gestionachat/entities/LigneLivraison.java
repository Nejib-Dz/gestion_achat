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
public class LigneLivraison {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long idLnLivraisons;
	private double quantiteLivree;
	private Date dateLivraisons;
	private String statutLivraisons;
}
