package net.gestionachat.entities;

import java.util.List;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor @NoArgsConstructor
@Data

public class LigneCommande {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "idLigneCmd", nullable = false)
	private Long idLigneCmd;
	private double quantite;
	private int numCommande;
	private int codeProduit;






}
