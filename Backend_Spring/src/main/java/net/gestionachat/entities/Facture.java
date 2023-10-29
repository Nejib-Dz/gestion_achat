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
public class Facture {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	 private Long idFacture;
	 private int numFacture;
	 private Date dateFacture;
	 private String etatFacture;
	 private String methodePay;
	 private String refFournisseur;
	 
	 
}
