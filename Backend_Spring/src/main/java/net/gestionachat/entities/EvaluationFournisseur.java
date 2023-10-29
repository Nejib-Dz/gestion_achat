
package net.gestionachat.entities;


import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class EvaluationFournisseur {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String performance;
    private String fiabilite;

   private String description;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "fournisseur_id")
    //@JsonBackReference
    private Fournisseur fournisseur;


}
