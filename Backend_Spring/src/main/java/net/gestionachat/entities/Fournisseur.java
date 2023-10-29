package net.gestionachat.entities;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import net.gestionachat.user.User;

import java.util.List;


@Entity
@AllArgsConstructor @NoArgsConstructor
@Getter @Setter

public class Fournisseur{

        @Id
        @GeneratedValue(strategy = GenerationType.AUTO)
        private Integer id;
        private String name;
        private String email;
        private String tele;
        private String country;
        //private String address;

        //private Boolean valide;
//        @ManyToOne
//        @JoinColumn(name = "commande_id")
//        private Commande commande;


        @OneToMany(mappedBy = "fournisseur", cascade = CascadeType.ALL)
        //@JsonManagedReference
        private List<EvaluationFournisseur> evaluations;
}
