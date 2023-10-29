package net.gestionachat.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.gestionachat.user.User;



import java.util.Date;
import java.util.List;

@Entity
@AllArgsConstructor @NoArgsConstructor
@Data
@Table(name = "demande_achat")
public class DemandeAchat {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    private Date dateDemande;
    private Date dateApprobation;
    private double qteDemandee;
    private double  qteApprouvee;
    private String description;
    private String name;
    private String delais;
    private String etat;
    private String motifRejet;

    @ManyToOne
    @JoinColumn(name = "commande_id")
    private Commande commande;
    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "id_user_demandeur")
    private User userDemandeur;
    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "id_user_approbateur")
    private User userApprouvant;



    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
    @JoinTable(	name = "demandeAchat_articles",
            joinColumns = @JoinColumn(name = "demandeAchat_id"),
            inverseJoinColumns = @JoinColumn(name = "article_id"))
        private List<Articles> articles;

}
